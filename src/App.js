import 'materialize-css/dist/css/materialize.min.css'
import React, { useState } from 'react'

import './App.css'

import { rollD6 } from './random'
import Counter from './components/counter'
import DiceDisplay from './components/diceDisplay'
import Results from './components/results'
import ClassicRolls from './components/classicRolls'
import { ReactComponent as Reticle } from './components/reticle.svg'

const MAX_DICE = 15
const MAX_STRESS = 15

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

let nextId = 0
const makeDie = type => ({ id: nextId++, type, value: rollD6() })
const makePool = (baseCount, stressCount) => [
  ...Array.from({ length: baseCount }, () => makeDie('base')),
  ...Array.from({ length: stressCount }, () => makeDie('stress'))
]

function App () {
  const [baseCount, setBaseCount] = useState(0)
  const [stressDice, setStressDice] = useState(0)
  const [stressLevel, setStressLevel] = useState(0)
  const [stressEnabled, setStressEnabled] = useState(true)
  const [dice, setDice] = useState([])
  const [rolled, setRolled] = useState(false)
  const [pushed, setPushed] = useState(false)
  const [panic, setPanic] = useState(null)

  // Nombre de dés de stress réellement utilisés (0 quand le stress est désactivé)
  const activeStressDice = stressEnabled ? stressDice : 0

  const facehuggers = dice.filter(d => d.type === 'stress' && d.value === 1).length
  const poolEmpty = baseCount === 0 && activeStressDice === 0

  // Pas de push : déjà poussé, jet passif (stress désactivé) ou facehugger présent
  const canPush = rolled && dice.length > 0 && stressEnabled && !pushed && facehuggers === 0

  // Toute modification de la pool efface l'affichage
  const clearRoll = () => {
    setDice([])
    setRolled(false)
    setPushed(false)
    setPanic(null)
  }

  const handleBaseChange = n => {
    setBaseCount(n)
    clearRoll()
  }

  // Ajustement manuel des dés de stress (toujours possible quand le stress est activé)
  const handleStressDiceChange = n => {
    setStressDice(n)
    clearRoll()
  }

  // Le niveau de stress pilote automatiquement le nombre de dés de stress
  const handleStressLevelChange = n => {
    const delta = n - stressLevel
    setStressLevel(n)
    setStressDice(clamp(stressDice + delta, 0, MAX_DICE))
    clearRoll()
  }

  // Désactivation temporaire (jets passifs) : les valeurs sont conservées
  const handleStressToggle = e => {
    setStressEnabled(e.target.checked)
    clearRoll()
  }

  const handleRoll = () => {
    setDice(makePool(baseCount, activeStressDice))
    setRolled(true)
    setPushed(false)
    setPanic(null)
  }

  // Pousser (une seule fois) : relance tous les dés qui ne montrent pas un 6,
  // +1 niveau de stress et +1 dé de stress.
  const handlePush = () => {
    const newDice = dice.map(d => (d.value === 6 ? d : { ...d, value: rollD6() }))

    if (stressLevel < MAX_STRESS && stressDice < MAX_DICE) {
      setStressLevel(stressLevel + 1)
      setStressDice(stressDice + 1)
      newDice.push(makeDie('stress'))
    }
    setDice(newDice)
    setPushed(true)
  }

  // Jet de panique manuel : D6 (+ niveau de stress actuel)
  const handlePanic = () => {
    setPanic({ d6: rollD6(), level: stressLevel })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Reticle className='App-logo hide-on-small-only' width='80' height='80' />
        <h1 className='App-title'>ALIEN – Lanceur de dés</h1>
      </header>

      <main>
        <div className='container'>
          <div className='row'>
            <div className='col s12 m5'>
              <Counter
                id='base'
                label='Dés de base (noirs)'
                color='#111'
                textColor='#f5f5f5'
                value={baseCount}
                min={0}
                max={MAX_DICE}
                onChange={handleBaseChange}
              />

              <div className='stress-block'>
                <div className='switch'>
                  <label>
                    Jet passif
                    <input
                      type='checkbox'
                      checked={stressEnabled}
                      onChange={handleStressToggle}
                    />
                    <span className='lever' />
                    Stress activé
                  </label>
                </div>

                <Counter
                  id='stress-dice'
                  label='Dés de stress (jaunes)'
                  color='#f5c400'
                  textColor='#111'
                  value={stressDice}
                  min={0}
                  max={MAX_DICE}
                  disabled={!stressEnabled}
                  onChange={handleStressDiceChange}
                />
                <Counter
                  id='stress-level'
                  label='Niveau de stress'
                  color='#c0392b'
                  textColor='#fff'
                  value={stressLevel}
                  min={0}
                  max={MAX_STRESS}
                  disabled={!stressEnabled}
                  onChange={handleStressLevelChange}
                />
              </div>

              <div>
                <button
                  type='button'
                  className='waves-effect waves-light btn'
                  disabled={poolEmpty}
                  onClick={handleRoll}>
                  Lancer
                </button>{' '}
                <button
                  type='button'
                  className='waves-effect waves-light btn'
                  disabled={!canPush}
                  onClick={handlePush}>
                  Pousser
                </button>
              </div>
            </div>

            <div className='col s12 m7'>
              <DiceDisplay dice={dice} />
              {rolled && <Results dice={dice} />}

              {rolled && facehuggers > 0 && (
                <div className='panic' style={{ marginTop: '16px' }}>
                  <p style={{ color: '#f5c400', margin: '0 0 8px' }}>
                    Facehugger : crise de panique !
                  </p>
                  <button
                    type='button'
                    className='waves-effect waves-light btn red darken-3'
                    disabled={panic !== null}
                    onClick={handlePanic}>
                    Jet de panique (D6)
                  </button>
                  {panic && (
                    <div className='panic-result' style={{ marginTop: '10px', fontSize: '1.4rem' }}>
                      D6 : <strong>{panic.d6}</strong>
                      {' · '}avec le stress ({panic.level}) :{' '}
                      <strong>{panic.d6 + panic.level}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <ClassicRolls roll={rollD6} />
            </div>
          </div>
        </div>
      </main>

      <footer className='page-footer'>
        <div className='container'>
          Lanceur de dés pour le JDR ALIEN. Basé sur{' '}
          <a
            href='https://github.com/jkottler/myz-roller'
            rel='noopener noreferrer'
            target='_blank'>
            myz-roller
          </a>{' '}
          (MIT). Icônes :{' '}
          <a
            href='https://game-icons.net'
            rel='noopener noreferrer'
            target='_blank'>
            game-icons.net
          </a>
          .
        </div>
      </footer>
    </div>
  )
}

export default App

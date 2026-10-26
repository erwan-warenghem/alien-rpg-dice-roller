import 'materialize-css/dist/css/materialize.min.css'
import React, { useState } from 'react'

import './App.css'

import { rollD6 } from './random'
import Counter from './components/counter'
import DiceDisplay from './components/diceDisplay'
import Results from './components/results'
import ToolsPanel from './components/toolsPanel'
import { ReactComponent as Reticle } from './components/reticle.svg'

const MAX_DICE = 15 // dés de base
const MAX_STRESS = 15

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

let nextId = 0
const makeDie = type => ({ id: nextId++, type, value: rollD6() })
const makePool = (baseCount, stressCount) => [
  ...Array.from({ length: baseCount }, () => makeDie('base')),
  ...Array.from({ length: stressCount }, () => makeDie('stress'))
]

function App () {
  const [baseCount, setBaseCount] = useState(5)
  // Niveau de stress = nombre de dés de stress (jaunes)
  const [stressLevel, setStressLevel] = useState(0)
  const [stressEnabled, setStressEnabled] = useState(true)
  const [dice, setDice] = useState([])
  const [rolled, setRolled] = useState(false)
  const [pushed, setPushed] = useState(false)
  const [panic, setPanic] = useState(null)

  // Dés de stress réellement utilisés (0 en jet passif)
  const activeStressDice = stressEnabled ? stressLevel : 0

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

  const handleStressChange = n => {
    setStressLevel(n)
    clearRoll()
  }

  // Désactivation temporaire (jets passifs) : le niveau est conservé
  const handleStressToggle = e => {
    setStressEnabled(e.target.checked)
    clearRoll()
  }

  // Jet de panique automatique dès qu'un facehugger sort : D6 (+ niveau de stress)
  const checkPanic = (newDice, level) => {
    const hasFacehugger = newDice.some(d => d.type === 'stress' && d.value === 1)
    setPanic(hasFacehugger ? { d6: rollD6(), level } : null)
  }

  const handleRoll = () => {
    const newDice = makePool(baseCount, activeStressDice)
    setDice(newDice)
    setRolled(true)
    setPushed(false)
    checkPanic(newDice, stressLevel)
  }

  // Pousser (une seule fois) : relance tous les dés qui ne montrent pas un 6,
  // +1 niveau de stress, donc +1 dé de stress.
  const handlePush = () => {
    const newDice = dice.map(d => (d.value === 6 ? d : { ...d, value: rollD6() }))
    let level = stressLevel

    if (stressLevel < MAX_STRESS) {
      level = stressLevel + 1
      setStressLevel(level)
      newDice.push(makeDie('stress'))
    }
    setDice(newDice)
    setPushed(true)
    checkPanic(newDice, level)
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
                  id='stress'
                  label='Stress (dés jaunes)'
                  color='#f5c400'
                  textColor='#111'
                  value={stressLevel}
                  min={0}
                  max={MAX_STRESS}
                  disabled={!stressEnabled}
                  onChange={handleStressChange}
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

              {rolled && panic && (
                <div className='panic' style={{ marginTop: '16px' }}>
                  <p style={{ color: '#f5c400', margin: '0 0 8px', fontSize: '1.2rem' }}>
                    Facehugger : crise de panique !
                  </p>
                  <div className='panic-result' style={{ fontSize: '1.4rem' }}>
                    D6 : <strong>{panic.d6}</strong>
                    {' · '}avec le stress ({panic.level}) :{' '}
                    <strong>{panic.d6 + panic.level}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <ToolsPanel roll={rollD6} />
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

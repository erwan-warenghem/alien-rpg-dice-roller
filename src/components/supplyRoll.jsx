import React, { useState } from 'react'

import Counter from './counter'
import Die from './die'

const MAX_SUPPLY = 15

// Jet de réserve : autant de dés jaunes que le niveau de réserve,
// et le niveau baisse de 1 par facehugger.
function SupplyRoll ({ roll }) {
  const [level, setLevel] = useState(0)
  const [result, setResult] = useState(null)

  const handleLevelChange = n => {
    setLevel(n)
    setResult(null)
  }

  const handleRoll = () => {
    const values = Array.from({ length: level }, () => roll())
    const facehuggers = values.filter(v => v === 1).length
    const newLevel = Math.max(0, level - facehuggers)
    setResult({ values, facehuggers, from: level, to: newLevel })
    setLevel(newLevel)
  }

  return (
    <div className='supply-tool'>
      <Counter
        id='supply'
        label='Niveau de réserve'
        color='#f5c400'
        textColor='#111'
        value={level}
        min={0}
        max={MAX_SUPPLY}
        onChange={handleLevelChange}
      />
      <button
        type='button'
        className='btn'
        disabled={level === 0}
        onClick={handleRoll}>
        Jet de réserve
      </button>

      {result && (
        <div className='supply-result' style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {result.values.map((v, i) => <Die key={i} type='stress' value={v} />)}
          </div>
          <div style={{ fontSize: '1.4rem', marginTop: '6px' }}>
            Facehugger{result.facehuggers > 1 ? 's' : ''} : <strong>{result.facehuggers}</strong>
            {' · '}Réserve : <strong>{result.from} → {result.to}</strong>
          </div>
          {result.to === 0 && (
            <div className='supply-empty' style={{ color: '#f5c400', fontSize: '1.2rem', marginTop: '6px' }}>
              Réserve épuisée !
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SupplyRoll

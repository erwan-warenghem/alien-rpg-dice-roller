import React, { useState } from 'react'

const dieStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  margin: '4px',
  borderRadius: '8px',
  background: '#f5f5f5',
  color: '#111',
  fontSize: '2rem',
  fontWeight: 'bold'
}

// Jets classiques : D6, 2D6 additionnés (2-12) et D66 (dizaine + unité, 11-66)
function ClassicRolls ({ roll }) {
  const [result, setResult] = useState(null)

  const handle = kind => {
    const a = roll()
    if (kind === 'd6') {
      setResult({ kind, values: [a], text: `${a}` })
      return
    }
    const b = roll()
    setResult(
      kind === '2d6'
        ? { kind, values: [a, b], text: `${a + b}` }
        : { kind, values: [a, b], text: `${a}${b}` }
    )
  }

  return (
    <div className='classic-rolls'>
      <h5>Dés classiques</h5>
      <button type='button' className='btn' onClick={() => handle('d6')}>D6</button>{' '}
      <button type='button' className='btn' onClick={() => handle('2d6')}>2D6 (2-12)</button>{' '}
      <button type='button' className='btn' onClick={() => handle('d66')}>D66</button>

      {result && (
        <div className='classic-result' style={{ marginTop: '14px' }}>
          {result.values.map((v, i) => <span key={i} style={dieStyle}>{v}</span>)}
          {result.kind !== 'd6' && (
            <span style={{ fontSize: '2.4rem', fontWeight: 'bold', marginLeft: '10px' }}>
              {result.kind === '2d6' ? '= ' : '→ '}
              <span className='classic-total'>{result.text}</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ClassicRolls

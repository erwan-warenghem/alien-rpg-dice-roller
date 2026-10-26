import React, { useState } from 'react'

const dieStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 56px',
  width: '56px',
  height: '56px',
  margin: '4px',
  borderRadius: '8px',
  background: '#f5f5f5',
  color: '#111',
  fontSize: '2rem',
  fontWeight: 'bold'
}

function RefreshIcon () {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor' style={{ display: 'block' }}>
      <path d='M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' />
    </svg>
  )
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
    <div className='classic-tool'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        <button type='button' className='btn' onClick={() => handle('d6')}>D6</button>
        <button type='button' className='btn' onClick={() => handle('2d6')}>2D6 (2-12)</button>
        <button type='button' className='btn' onClick={() => handle('d66')}>D66</button>
        <button
          type='button'
          className='btn'
          aria-label='Réinitialiser les dés classiques'
          title='Réinitialiser'
          disabled={result === null}
          onClick={() => setResult(null)}
          style={{ padding: '0 12px' }}>
          <RefreshIcon />
        </button>
      </div>

      {result && (
        <div
          className='classic-result'
          style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

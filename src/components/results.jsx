import React from 'react'

import { ReactComponent as Reticle } from './reticle.svg'
import { ReactComponent as Facehugger } from './facehugger.svg'

const box = {
  display: 'inline-block',
  minWidth: '130px',
  margin: '8px',
  padding: '10px 16px',
  borderRadius: '8px',
  background: '#1b1f22',
  color: '#f5f5f5'
}

const number = { fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.1' }

function Results ({ dice }) {
  const successes = dice.filter(d => d.value === 6).length
  const facehuggers = dice.filter(d => d.type === 'stress' && d.value === 1).length

  return (
    <div className='results' style={{ marginTop: '20px' }}>
      <div style={box}>
        <Reticle width='28' height='28' />
        <div style={number}>{successes}</div>
        <div>succès</div>
      </div>
      <div style={{ ...box, color: facehuggers > 0 ? '#f5c400' : '#f5f5f5' }}>
        <Facehugger width='28' height='28' />
        <div style={number}>{facehuggers}</div>
        <div>facehugger{facehuggers > 1 ? 's' : ''}</div>
      </div>
    </div>
  )
}

export default Results

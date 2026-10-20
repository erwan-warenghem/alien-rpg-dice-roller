import React from 'react'

import { ReactComponent as Reticle } from './reticle.svg'
import { ReactComponent as Facehugger } from './facehugger.svg'

// base   = dé noir  : 6 = réticule, autres faces vierges
// stress = dé jaune : 6 = réticule, 1 = facehugger, autres faces vierges
export const dieTypes = {
  base: { background: '#111', foreground: '#f5f5f5', border: '#555' },
  stress: { background: '#f5c400', foreground: '#111', border: '#a88400' }
}

const style = {
  width: '56px',
  height: '56px',
  margin: '4px',
  borderRadius: '8px',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box'
}

function Face ({ type, value }) {
  if (value === 6) return <Reticle width='38' height='38' aria-label='réticule' />
  if (value === 1 && type === 'stress') {
    return <Facehugger width='38' height='38' aria-label='facehugger' />
  }
  return null // face vierge
}

function Die ({ type, value }) {
  const { background, foreground, border } = dieTypes[type]
  return (
    <div
      className='die'
      style={{
        ...style,
        background,
        color: foreground,
        border: `2px solid ${border}`
      }}>
      <Face type={type} value={value} />
    </div>
  )
}

export default Die

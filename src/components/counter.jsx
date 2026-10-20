import React from 'react'

const buttonStyle = {
  width: '44px',
  height: '44px',
  borderRadius: '8px',
  border: 'none',
  fontSize: '1.8rem',
  lineHeight: '1',
  cursor: 'pointer',
  userSelect: 'none'
}

const inputStyle = {
  width: '3.5rem',
  height: '44px',
  margin: '0 6px',
  textAlign: 'center',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  border: 'none',
  borderBottom: '2px solid #888',
  background: 'transparent',
  color: 'inherit'
}

// Compteur avec boutons -/+ et saisie directe.
function Counter ({ id, label, color, textColor, value, min, max, onChange, disabled }) {
  const clamp = n => Math.min(max, Math.max(min, n))

  const handleInput = e => {
    const n = parseInt(e.target.value, 10)
    onChange(clamp(Number.isNaN(n) ? min : n))
  }

  const btn = { ...buttonStyle, background: color, color: textColor }

  return (
    <div className='counter' style={{ marginBottom: '14px' }}>
      <label htmlFor={id} style={{ display: 'block', color: 'inherit', fontSize: '1rem' }}>
        {label}
      </label>
      <button
        type='button'
        style={btn}
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - 1))}
        aria-label={`${label} : moins`}>
        −
      </button>
      <input
        id={id}
        className='browser-default'
        style={inputStyle}
        type='number'
        inputMode='numeric'
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={handleInput}
      />
      <button
        type='button'
        style={btn}
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + 1))}
        aria-label={`${label} : plus`}>
        +
      </button>
    </div>
  )
}

export default Counter

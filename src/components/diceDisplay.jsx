import React from 'react'
import Die from './die'

// Lignes en flex : les dés restent alignés, avec ou sans symbole
const row = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
}

function DiceDisplay ({ dice }) {
  const base = dice.filter(die => die.type === 'base')
  const stress = dice.filter(die => die.type === 'stress')

  return (
    <div>
      <div style={row}>
        {base.map(die => <Die key={die.id} type={die.type} value={die.value} />)}
      </div>
      <div style={row}>
        {stress.map(die => <Die key={die.id} type={die.type} value={die.value} />)}
      </div>
    </div>
  )
}

export default DiceDisplay

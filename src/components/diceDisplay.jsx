import React from 'react'
import Die from './die'

function DiceDisplay ({ dice }) {
  return (
    <div>
      <div>
        {dice
          .filter(die => die.type === 'base')
          .map(die => <Die key={die.id} type={die.type} value={die.value} />)}
      </div>
      <div>
        {dice
          .filter(die => die.type === 'stress')
          .map(die => <Die key={die.id} type={die.type} value={die.value} />)}
      </div>
    </div>
  )
}

export default DiceDisplay

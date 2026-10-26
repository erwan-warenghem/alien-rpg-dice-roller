import React, { useState } from 'react'

import ClassicRolls from './classicRolls'
import SupplyRoll from './supplyRoll'

const tabStyle = active => ({
  background: 'transparent',
  border: 'none',
  borderBottom: `3px solid ${active ? '#4cff7a' : 'transparent'}`,
  color: active ? '#4cff7a' : '#e8e8e8',
  fontSize: '1.2rem',
  padding: '8px 16px',
  cursor: 'pointer'
})

// Zone à onglets : un seul outil visible à la fois, les deux restent actifs
// (on ne perd pas le résultat en changeant d'onglet).
function ToolsPanel ({ roll }) {
  const [tab, setTab] = useState('classic')

  return (
    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #333' }}>
      <div role='tablist'>
        <button
          type='button'
          role='tab'
          aria-selected={tab === 'classic'}
          style={tabStyle(tab === 'classic')}
          onClick={() => setTab('classic')}>
          Dés classiques
        </button>
        <button
          type='button'
          role='tab'
          aria-selected={tab === 'supply'}
          style={tabStyle(tab === 'supply')}
          onClick={() => setTab('supply')}>
          Réserve
        </button>
      </div>

      <div style={{ marginTop: '14px', display: tab === 'classic' ? 'block' : 'none' }}>
        <ClassicRolls roll={roll} />
      </div>
      <div style={{ marginTop: '14px', display: tab === 'supply' ? 'block' : 'none' }}>
        <SupplyRoll roll={roll} />
      </div>
    </div>
  )
}

export default ToolsPanel

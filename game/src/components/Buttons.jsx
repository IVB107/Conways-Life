import React from 'react'

import '../index.css'

const Buttons = (props) => {

  return (
    <div >
      <button onClick={props.playButton}>
        Play
      </button>
      <button onClick={props.pauseButton}>
        Pause
      </button>
      <button onClick={props.clear}>
        Clear
      </button>
      <button onClick={props.slow}>
        Slow
      </button>
      <button onClick={props.fast}>
        Fast
      </button>
      <button onClick={props.seed}>
        Seed
      </button>
      <select 
        name="Grid Size" 
        onChange={(e) => props.gridSize(e)}
      >
        <option value="60">60 x 60</option>
        <option value="40">40 x 40</option>
        <option value="20">20 x 20</option>
      </select>
    </div>
  )
}

export default Buttons
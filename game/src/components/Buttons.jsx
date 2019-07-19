import React, { Component } from 'react'

import '../index.css'

class Buttons extends Component {

  render () {

    return (
      <div >
        <button onClick={this.props.playButton}>
          Play
        </button>
        <button onClick={this.props.pauseButton}>
          Pause
        </button>
        <button onClick={this.props.clear}>
          Clear
        </button>
        <button onClick={this.props.slow}>
          Slow
        </button>
        <button onClick={this.props.fast}>
          Fast
        </button>
        <button onClick={this.props.seed}>
          Seed
        </button>
        <select 
          name="Grid Size" 
          onChange={(e) => this.props.gridSize(e)}
        >
          <option value="60">60 x 60</option>
          <option value="40">40 x 40</option>
          <option value="20">20 x 20</option>
        </select>
      </div>
    )
  }
}

export default Buttons
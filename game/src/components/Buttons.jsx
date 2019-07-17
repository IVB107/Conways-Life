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
      </div>
    )
  }
}

export default Buttons
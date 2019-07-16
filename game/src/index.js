import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Grid from './components/Grid'

class Main extends Component {

  constructor() {
    super()
    this.speed = 100
    this.rows = 40
    this.cols = 40

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = [...this.state.gridFull]
    gridCopy[row][col] = !gridCopy[row][col]
    this.setState({
      gridFull: gridCopy
    })
  }

  seed = () => {
    let gridCopy = [...this.state.gridFull]
    for (let r = 0; r < this.rows; r++){
      for (let c = 0; c < this.cols; c++){
        if (Math.floor(Math.random() * 4) === 1){
          gridCopy[r][c] = true
        }
      }
    }
    this.setState({gridFull: gridCopy})
  }

  componentDidMount = () => {
    this.seed()
  }

  render () {
    return (
      <>
        <h1>The Game of Life</h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Iterations: {this.state.generation}</h2>
      </>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
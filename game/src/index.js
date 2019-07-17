import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import Grid from './components/Grid'
import FlexGrid from './components/FlexGrid'
import Buttons from './components/Buttons'

class Main extends Component {

  constructor() {
    super()
    this.speed = 100
    this.rows = 60
    this.cols = 60

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
    let gridCopy = Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    for (let r = 0; r < this.rows; r++){
      for (let c = 0; c < this.cols; c++){
        if (Math.floor(Math.random() * 10) === 1){
          gridCopy[r][c] = true
        }
      }
    }
    this.setState({gridFull: gridCopy})
  }

  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.playGame, this.speed)
  }

  pauseButton = () => {
    clearInterval(this.intervalId)
  }

  slow = () => {
    this.speed = 1000
    this.playButton()
  }

  fast = () => {
    this.speed = 100
    this.playButton()
  }

  clear = () => {
    clearInterval(this.intervalId)
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    this.setState({
      gridFull: grid, 
      generation: 0
    })
  }

  playGame = () => {
    // let currentGrid = this.state.gridFull
    // let nextGen = [...this.state.gridFull]

    // // 1. Count the number of 'live' neighbors (max 8) for each box
    // for (let i = 0; i < this.rows; i++) {
    //   for (let j = 0; j < this.cols; j++) {
    //     let neighbors = 0
    //     if (i > 0 && currentGrid[i - 1][j]) neighbors++;
    //     if ((i > 0 && j > 0) && currentGrid[i - 1][j - 1]) neighbors++
    //     if ((i > 0 && j < this.cols - 1) && currentGrid[i - 1][j + 1]) neighbors++
    //     if ((j < this.cols - 1) && currentGrid[i][j + 1]) neighbors++
    //     if (j > 0 && currentGrid[i][j - 1]) neighbors++
    //     if (i < this.rows - 1 && currentGrid[i + 1][j]) neighbors++
    //     if ((i < this.rows - 1 && j > 0) && currentGrid[i + 1][j - 1]) neighbors++
    //     if ((i < this.rows - 1 && j < this.cols - 1) && currentGrid[i + 1][j + 1]) neighbors++

    //     // 2. Set box to True/False according to the rules
    //     // Box lives
    //     if (!currentGrid[i][j] && neighbors === 3) nextGen[i][j] = true
    //     // Box dies
    //     if (currentGrid[i][j] && (neighbors !== 3)) nextGen[i][j] = false
    //   }
    // }
		// this.setState({
    //   gridFull: nextGen,
    //   generation: this.state.generation++
    // });
    
    let currentGrid = this.state.gridFull;
		let nextGen = [...this.state.gridFull];

		for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (currentGrid[i - 1][j]) count++;
        if (i > 0 && j > 0) if (currentGrid[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (currentGrid[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (currentGrid[i][j + 1]) count++;
        if (j > 0) if (currentGrid[i][j - 1]) count++;
        if (i < this.rows - 1) if (currentGrid[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (currentGrid[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (currentGrid[i + 1][j + 1]) count++;
        if (currentGrid[i][j] && (count < 2 || count > 3)) nextGen[i][j] = false;
        if (!currentGrid[i][j] && count === 3) nextGen[i][j] = true;
      }
    }
    this.setState({
      gridFull: nextGen,
      generation: this.state.generation + 1
});

  }

  componentDidMount = () => {
    this.seed()
    this.playButton()
  }

  render () {
    return (
      <>
        <h1>The Game of Life</h1>
        {/* <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        /> */}
        <FlexGrid 
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <Buttons 
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <h2>Iterations: {this.state.generation}</h2>
      </>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
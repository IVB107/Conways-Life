import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Styled from 'styled-components'

import './index.css';
import Grid from './components/Grid'
import Buttons from './components/Buttons'

class Main extends Component {

  constructor() {
    super()
    this.speed = 50
    this.rows = 60
    this.cols = 60

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  gridCopy = (arr) => JSON.parse(JSON.stringify(arr))

  selectBox = (row, col) => {
    // Prevent box selection while game is in progress
    if (this.state.generation === 0) {
      let gridCopy = [...this.state.gridFull]
      gridCopy[row][col] = !gridCopy[row][col]
      this.setState({
        gridFull: gridCopy
      })
    }
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

  clear = (resized) => {
    clearInterval(this.intervalId)
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    this.setState({
      gridFull: grid, 
      generation: 0
    })
    // Re-seed grid if cleared by grid resize
    if (resized === "resized") this.seed()
  }

  handleGridSize = (size) => {
    console.log("Inside grid size function!")
    console.log("Size: ", size.target.value)
    switch (size) {
      case "20":
        this.cols = Number(size.target.value)
        this.rows = Number(size.target.value)
      break;
      case "40":
        this.cols = Number(size.target.value)
        this.rows = Number(size.target.value)
      break;
      default:
        this.cols = Number(size.target.value)
        this.rows = Number(size.target.value)
    }
    // Reset & update grid
    this.clear("resized")
  }

  playGame = () => {
    let currentGrid = [...this.state.gridFull]
    // let nextGen = [...this.state.gridFull]
    let nextGen = this.gridCopy(this.state.gridFull)

		for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        // Top Neighbor
        if (i > 0 && currentGrid[i - 1][j]) count++
        // Top Left Neighbor
        if ((i > 0 && j > 0) && (currentGrid[i - 1][j - 1])) count++
        // Top Right Neighbor
        if ((i > 0 && j < this.cols - 1) && (currentGrid[i - 1][j + 1])) count++
        // Right Neighbor
        if (j < this.cols - 1 && currentGrid[i][j + 1]) count++
        // Left Neighbor
        if (j > 0 && currentGrid[i][j - 1]) count++
        // Bottom Neighbor
        if (i < this.rows - 1 && currentGrid[i + 1][j]) count++
        // Bottom Left Neighbor
        if ((i < this.rows - 1 && j > 0) && (currentGrid[i + 1][j - 1])) count++
        // Bottom Right Neighbor
        if ((i < this.rows - 1 && j < this.cols - 1) && currentGrid[i + 1][j + 1]) count++

        // Box Dies
        if (currentGrid[i][j] && (count < 2 || count > 3)) nextGen[i][j] = false;
        // It's alive!!
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
  }

  render () {
    return (
      <MainContainer>
        <h1>The Game of Life</h1>
        <Grid 
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
          gridSize={(e) => this.handleGridSize(e)}
        />
        <h2>Iterations: {this.state.generation}</h2>
      </MainContainer>
    )
  }
}

const MainContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

ReactDOM.render(<Main />, document.getElementById('root'));
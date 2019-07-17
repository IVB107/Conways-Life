import React, { Component } from 'react'

import '../index.css'
import Box from './Box'

class Grid extends Component {

  render () {

    // const width = `${(this.props.cols * 17)-20}px`
    const width = `${(this.props.cols * 16)}px`
    let rowsArr = []

    // Refactor to use map() ?
    for (let r = 0; r < this.props.rows; r++) {
      for(let c = 0; c < this.props.cols; c++) {
        let boxId = `${r}_${c}`
        let boxClass = this.props.gridFull[r][c] ? "box on" : "box off"

        rowsArr.push(
          <Box 
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={r}
            col={c}
            selectBox={this.props.selectBox}
          />
        )

      }
    }

    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    )
  }
}

export default Grid
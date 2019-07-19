import React, { Component } from 'react'
import Styled from 'styled-components'

import '../index.css'
import Box from './Box'

class FlexGrid extends Component {

  render () {

    // const width = `${(this.props.cols * 17)-20}px`
    const width = `${(this.props.cols * 15)}px`
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
      <Grid style={{width: width}}>
        {rowsArr}
      </Grid>
    )
  }
}

const Grid = Styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 20px 0;
`

export default FlexGrid
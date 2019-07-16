import React from 'react'
import '../index.css'

const Box = (props) => {

  return (
    <div 
      className={props.boxClass}
      id={props.id}
      // onClick={this.selectBox}
      onMouseOver={() => props.selectBox(props.row, props.col)}
    />
  )
}

export default Box
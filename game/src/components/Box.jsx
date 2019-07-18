import React from 'react'
// import Styled from 'styled-components'

import '../index.css'

const Box = (props) => {

  return (
    <div 
      className={props.boxClass}
      id={props.id}
      onClick={() => props.selectBox(props.row, props.col)}
      // onMouseOver={() => props.selectBox(props.row, props.col)}
    />
  )
}

// const Box = Styled.div`
//   display: flex;
//   height: 15px;
//   width: 15px;
// `

export default Box
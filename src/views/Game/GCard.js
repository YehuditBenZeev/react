import React from 'react'
import 'assets/css/GCard.css'

const GCard = props => {
  const {word, frontImg, backImg, flipped, onClick} = props
  const img = flipped ? frontImg : backImg
  const vWord = flipped ? word : ""
  return (
    <div className="GCard" onClick={onClick}>
      <img src={img} alt=""/>
      <p>{vWord}</p>
    </div>
  )
}

export default GCard
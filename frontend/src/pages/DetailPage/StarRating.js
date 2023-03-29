import React from 'react'
import './StarRating.css'

function StarRating() {

  const drawStar = (e) => {
    document.querySelector(`.star span`).style.width = `${e.target.value * 10}%`;
    console.log(e.target.value)
  }

  return (
    <div>
      <span className="star">
        ★★★★★
        <span>★★★★★</span>
        <input type="range" onInput={drawStar} value="1" step="1" min="0" max="10"/>
      </span>
    </div>
  )
}

export default StarRating
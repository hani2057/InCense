import React, { useEffect } from "react";
import "./StarRating.css";

function StarRating({ setStarValue, size, isSearch, setErrorMsg, starValue }) {
  useEffect(() => {
    if (starValue) {
      document.querySelector(`.star span`).style.width = `${starValue * 10}%`;
    }
  }, []);

  const drawStar = (e) => {
    document.querySelector(`.star span`).style.width = `${
      e.target.value * 10
    }%`;

    if (isSearch) {
      setStarValue((prev) => ({ ...prev, preference: e.target.value }));
      setErrorMsg("");
    } else setStarValue(e.target.value);
  };

  return (
    <div>
      <span className="star" style={{ fontSize: `${size || "2rem"}` }}>
        ★★★★★
        <span>★★★★★</span>
        <input
          type="range"
          onInput={drawStar}
          value="1"
          step="1"
          min="0"
          max="10"
        />
      </span>
    </div>
  );
}

export default StarRating;

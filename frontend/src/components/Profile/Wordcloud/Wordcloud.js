import React, { useEffect, useRef } from "react";
import WordCloud from "react-d3-cloud";

const Wordcloud = ({ data }) => {
  // const data = [
  //   { text: "Hey", value: 1000 },
  //   { text: "lol", value: 200 },
  //   { text: "first impression", value: 800 },
  //   { text: "very cool", value: 1000000 },
  //   { text: "duck", value: 10 },
  // ];

  const canvasRef = useRef(null);

  // set willReadFrequently to true
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").willReadFrequently = true;
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <WordCloud data={data} />
    </div>
  );
};

export default Wordcloud;

import React, { useEffect, useRef, useState } from "react";
import WordCloud from "react-d3-cloud";

const Wordcloud = ({ wordcloud }) => {
  const canvasRef = useRef(null);

  // set willReadFrequently to true
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").willReadFrequently = true;
  }, []);

  return (
    <div
      style={{
        height: "15rem",
        position: "relative",
        top: "-10rem",
        marginBottom: "3rem",
      }}
    >
      <canvas ref={canvasRef} />
      <WordCloud
        data={wordcloud}
        // width={1000}
        // height={1000}
        spiral={"archimedean"}
        padding={5}
        rotate={(_, idx) => (idx % 2) * 90}
        fontSize={({ value }) => Math.log2(value * 10) * 15}
      />
    </div>
  );
};

export default Wordcloud;

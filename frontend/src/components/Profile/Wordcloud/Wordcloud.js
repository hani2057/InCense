import React, { useEffect, useRef, useState } from "react";
import WordCloud from "react-d3-cloud";

const Wordcloud = ({ wordcloud }) => {
  const [data, setData] = useState(wordcloud);

  console.log("dddd", data);

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
        marginBottom: "10rem",
      }}
    >
      <canvas ref={canvasRef} />
      <WordCloud
        data={data}
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

// import React, { useEffect } from "react";
// import * as d3 from "d3";
// import cloud from "d3-cloud";

// const width = 400;
// const height = 400;

// const Wordcloud = ({ data }) => {
//   useEffect(() => {
//     cloud()
//       .size([width, height])
//       .words(data)
//       .padding(5)
//       // .font("Impact")
//       .fontSize((d) => d.value)
//       .on("end", end)
//       .start();

//     function end(data) {
//       d3.select("#word-cloud")
//         .append("svg")
//         .attr("width", 500)
//         .attr("height", 500)
//         .style("border", "1px solid black")
//         .append("g")
//         .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
//         .selectAll("text")
//         .data(data)
//         .enter()
//         .append("text")
//         .style("font-size", function (d) {
//           return d.size + "px";
//         })
//         // .style("font-family", "Impact")
//         .attr("text-anchor", "middle")
//         .attr("transform", function (d) {
//           return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//         })
//         .text(function (d) {
//           return d.text;
//         });
//     }
//   }, []);

//   return (
//     <div>
//       <div id="word-cloud"></div>
//     </div>
//   );
// };

// export default Wordcloud;

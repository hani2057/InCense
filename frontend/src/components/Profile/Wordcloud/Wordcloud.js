// // import React, { useEffect, useRef } from "react";
// // import WordCloud from "react-d3-cloud";

// // const Wordcloud = ({ data }) => {
// //   // const data = [
// //   //   { text: "Hey", value: 1000 },
// //   //   { text: "lol", value: 200 },
// //   //   { text: "first impression", value: 800 },
// //   //   { text: "very cool", value: 1000000 },
// //   //   { text: "duck", value: 10 },
// //   // ];

// //   const canvasRef = useRef(null);

// //   // set willReadFrequently to true
// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     canvas.getContext("2d").willReadFrequently = true;
// //   }, []);

// //   return (
// //     <div>
// //       <canvas ref={canvasRef} />
// //       <WordCloud data={data} />
// //     </div>
// //   );
// // };

// // export default Wordcloud;

// // Result/index.js
// import React, { useEffect } from 'react';
// import * as d3 from 'd3';
// import cloud from 'd3-cloud';

// const width = 400
// const height = 400

// function HotelsResult() {
//   useEffect(() => {
//     const data = [
//       "Hello", "world", "normally", "you", "want", "more", "words",
//       "than", "this"]

//     cloud()
//       .size([width, height])
//       .words(data.map(function(d) {
//         return {text: d, size: 10 + Math.random() * 90, test: "haha"};
//       }))
//       .padding(5)
//       .font("Impact")
//       .fontSize(function(d) { return d.size; })
//       .on("end", end)
//       .start();

//     function end(words) {
//       d3.select("#word-cloud")
//           .append("svg")
//           .attr("width", 500)
//           .attr("height", 500)
//           .style("border", "1px solid black")
//         .append("g")
//           .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
//         .selectAll("text")
//           .data(words)
//         .enter().append("text")
//           .style("font-size", function(d) { return d.size + "px"; })
//           .style("font-family", "Impact")
//           .attr("text-anchor", "middle")
//           .attr("transform", function(d) {
//             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//           })
//           .text(function(d) { return d.text; });
//     }
//   })

//   return (
//     <div>
//       <h1>리뷰 분석 결과</h1>
//       <div id="word-cloud"></div>
//     </div>
//   )
// }

// export default HotelsResult;

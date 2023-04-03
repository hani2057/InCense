import React from "react";
import ReactWordcloud from "react-wordcloud";

const Wordcloud = () => {
  const words = [
    { text: "text1", value: 40 },
    { text: "text2", value: 64 },
    { text: "text3", value: 16 },
    { text: "text4", value: 11 },
    { text: "text5", value: 80 },
    { text: "text6", value: 25 },
    { text: "text7", value: 32 },
  ];

  return (
    <div>
      <ReactWordcloud
        words={words}
        options={{ rotationAngles: [0, -90], rotations: 2 }}
      />
    </div>
  );
};

export default Wordcloud;

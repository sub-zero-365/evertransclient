import React from "react";
import Wrapper from '../Assets/wrappers/bubble';
const BubbleTextHover = ({text}) => {
  return (
    <div className="grid h-screen-- place-content-center ">
      <BubbleText text={text}/>
    </div>
  );
};

const BubbleText = ({text}) => {
  return (
    <h2 className="text-center text-5xl font-thin text-indigo-300">
      {text?.split("").map((child, idx) => (
        <Wrapper key={idx}>
          {child}
        </Wrapper>
      ))}
    </h2>
  );
};

export default BubbleTextHover;
import React from "react";
import Lottie from 'react-lottie';
import animationData from "./loading-dots.json";

const LottieView: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
  );
};

export default LottieView;

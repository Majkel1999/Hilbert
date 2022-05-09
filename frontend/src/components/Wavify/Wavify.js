import React from "react";
import Wave from "react-wavify";

import "./Wavify.scss";

export default function Wavify() {
  return (
    <div className="waveContainer">
      <div className="firstWave">
        <Wave
          fill="#024873"
          paused={false}
          opacity="1"
          options={{
            height: 10,
            amplitude: 20,
            speed: 0.2,
            points: 3,
          }}
        />
      </div>
      <div className="secondWave">
        <Wave
          fill="#07668C"
          opacity="1"
          paused={false}
          options={{
            height: 50,
            amplitude: 20,
            speed: 0.3,
            points: 2,
          }}
        />
      </div>
      <div className="thirdWave">
        <Wave
          fill="#024873"
          paused={false}
          opacity="0.4"
          options={{
            height: 80,
            amplitude: 40,
            speed: 0.1,
            points: 4,
          }}
        />
      </div>
    </div>
  );
}

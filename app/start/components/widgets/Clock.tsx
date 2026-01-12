import React from "react";

type Props = {};

const Clock = (props: Props) => {
  return (
    <div className="clock-main">
      <div className="clock-content">
        <div className="date-time text-center">
          <div className="date text-7xl">21:22</div>
          <div className="time text-l">Mon Jan 12</div>
        </div>
      </div>
    </div>
  );
};

export default Clock;

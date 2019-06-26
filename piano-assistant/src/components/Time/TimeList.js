import React from "react";

import TimeItem from "./TimeItem";


const TimeList = ({ authUser, times, onRemoveTime }) => (
  <ul>
    {times.map(time => (
      <TimeItem authUser={authUser} key={time.uid} time={time} onRemoveTime={onRemoveTime} />
    ))}
  </ul>
);

export default TimeList;

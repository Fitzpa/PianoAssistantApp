import React from "react";

import TimeItem from "./TimeItem";


const TimeList = ({ authUser, times, onRemoveTime, notes }) => (
  <ul>
    {times.map(time => (
      <TimeItem authUser={authUser} key={time.uid} time={time} notes={notes} onRemoveTime={onRemoveTime} />
    ))}
  </ul>
);

export default TimeList;

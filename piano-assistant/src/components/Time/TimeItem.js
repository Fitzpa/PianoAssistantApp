import React, { Component } from "react";

let timePracticed;
function convertTime(time) {
  let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
  return hours + " : " + minutes + " : " + seconds; 
}
class TimeItem extends Component {
  render() {
    const { authUser, time, onRemoveTime } = this.props;
    timePracticed = convertTime(time.timerTime);
    return (
      <li>
        {authUser.uid === time.userId && (
          <span className="row grid-3 p my outline">
            {
              <>
                <span className="col">
                  <strong>{timePracticed + "  "}</strong>
                </span>
                <span className="col">
                  <strong>{time.createdAt + " "}</strong>
                </span>

                <button
                  className="col"
                  type="button"
                  onClick={() => onRemoveTime(time.uid)}
                >
                  X
                </button>
              </>
            }
          </span>
        )}
      </li>
    );
  }
}

export default TimeItem;

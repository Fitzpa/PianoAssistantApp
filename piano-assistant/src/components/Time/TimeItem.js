import React, { Component } from "react";

class TimeItem extends Component {
  render() {
    const { authUser, time, onRemoveTime } = this.props;

    return (
      <li>
        {authUser.uid === time.userId && (
          <span className="row grid-2">
            {
              <>
              
                <span className="col">
                  <strong>{time.timerTime + " "}</strong>
                </span>

                <button className="col" type="button" onClick={() => onRemoveTime(time.uid)}>
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

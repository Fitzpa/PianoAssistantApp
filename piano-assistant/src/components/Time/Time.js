import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class Time extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    timePracticed: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  logSession = () => {
    this.setState({
      timePracticed: this.state.timerTime
    });
  };

  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="timerContainer">
        <div className="Stopwatch-display">
          {hours} : {minutes} : {seconds}
        </div>
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button onClick={this.startTimer}>Start</button>
        )}
        {this.state.timerOn === true && (
          <button className="pauseTimer reset" onClick={this.stopTimer}><i className="fas fa-pause" /></button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button className="startTimer reset" onClick={this.startTimer}><i className="fas fa-play" /></button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button className="resetTimer reset" onClick={this.resetTimer}>Reset</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button className="logSession reset" onClick={this.logSession}>Log Session</button>
        )}
      </div>
    );
  }

  
}

export default withFirebase(Time);

import React, { Component } from "react";
import "moment-timezone";
import moment from "moment";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import "./modalInput.css";
import TimeList from "./TimeList";
import Modal from "react-modal";

const customStyles = {
  content: {
    backgroundColor: "#6d7993",
    maxWidth: "1080px",
    width: "100%",
    maxHeight: "1080px",
    height: "90%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    boxShadow: "0  5px 8px rgba(0, 0, 0, 0.2), 0  7px 20px rgba(0, 0, 0, 0.17)",
    transform: "translate(-50%, -50%)",
  },
};

class Times extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
      startBtnClicked: false,
      logSession: false,
      times: [],
      loading: false,
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleStartClick() {
    this.setState();
  }

  // MODAL -----------------------------
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  // -------------------------------------------
  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .times()
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let times = [];
          snapshot.forEach(doc => times.push({ ...doc.data(), uid: doc.id }));
          this.setState({
            times: times.reverse(),
            loading: false,
          });
          console.log({ times });
        } else {
          this.setState({ times: null, loading: false });
        }
      });
  }

  componentWillMount() {
    this.unsubscribe && this.unsubscribe();
  }

  // Creates and logs the amount of time practiced,
  // the users id and the exact date and time submitted
  onCreateTime = (event, authUser) => {
    this.props.firebase.times().add({
      timerTime: this.state.timerTime,
      userId: authUser.uid,
      createdAt: moment().format("MMMM D, YYYY, h:mm a"),
    });
    console.log("clicked");
    console.log(this.timerTime);

    this.setState({ timerTime: 0 });

    event.preventDefault();
  };

  // Removes the time record from the database permanently
  onRemoveTime = uid => {
    this.props.firebase.time(uid).delete();
  };

  // Starts timing how long the user has been practicing
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
      modalIsOpen: false,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 1000);
  };

  // Stops timing the users practice session
  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  // Resets the stopwatch
  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    const { timerTime, times, loading } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <div>
              {loading && <div>Loading ...</div>}

              {times && (
                <>
                  <h2 className="text-left">Hours</h2>
                  <TimeList
                    authUser={authUser}
                    times={times}
                    onRemoveTime={this.onRemoveTime}
                  />
                </>
              )}
              <>
                {!times && (
                  <div>
                    You haven't recorded any time yet. Start Practicing!
                  </div>
                )}
              </>
            </div>
            <div className="card">
              <div className="Stopwatch-display">
                {hours} : {minutes} : {seconds}
              </div>
              <div className="timerContainer">
                {this.state.timerOn === false && this.state.timerTime === 0 && (
                  <>
                    <Modal
                      isOpen={this.state.modalIsOpen}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2 ref={subtitle => (this.subtitle = subtitle)}>
                        You can do it!
                      </h2>
                      <button
                        className="align-center"
                        onClick={this.startTimer}
                      >
                        START
                      </button>
                      <form>
                        <span className="input">
                          <input type="text" placeholder="Notes" />
                          <span />
                        </span>
                      </form>
                    </Modal>
                    <button className="stopwatchBtn playBtn p" onClick={this.openModal}>
                      <i className="fas fa-play" />
                    </button>
                  </>
                )}
                {this.state.timerOn === true && (
                  <button
                    className="stopwatchBtn pauseTimer reset p mx"
                    onClick={this.stopTimer}
                  >
                    <i className="fas fa-pause" />
                  </button>
                )}
                {this.state.timerOn === false && this.state.timerTime > 0 && (
                  <button
                    className="stopwatchBtn startTimer reset p mx"
                    onClick={this.startTimer}
                  >
                    <i className="fas fa-play" />
                  </button>
                )}
                {this.state.timerOn === false && this.state.timerTime > 0 && (
                  <button
                    className="stopwatchBtn resetTimer reset p mx"
                    onClick={this.resetTimer}
                  >
                    Reset
                  </button>
                )}
                {this.state.timerOn === false && this.state.timerTime > 0 && (
                  <button
                    className="stopwatchBtn logSession reset p mx"
                    onClick={event => this.onCreateTime(event, authUser)}
                  >
                    Log Session
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Times);

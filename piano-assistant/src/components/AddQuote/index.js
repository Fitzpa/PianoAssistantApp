import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class AddQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
  }

  onAddQuote = event => {
    this.props.firebase.quotes().add({
      quote: this.state.quote,
      author: this.state.author,
    });
    console.log("clicked");
    console.log(this.author);
    console.log(this.quote);

    this.setState({ quote: "", author: "" });

    event.preventDefault();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <form className="white" >
          <h5 className="grey-text text-darken-3">Add A New Quote</h5>
          <div className="input-field">
            <input type="text" id="quote" onChange={this.handleChange} />
            <label htmlFor="quote">Quote:</label>
          </div>
          <div className="input-field">
            <input type="text" id="author" onChange={this.handleChange} />
            <label htmlFor="author">Author:</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1" onClick={event => this.onAddQuote(event)}>Create</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withFirebase(AddQuote);

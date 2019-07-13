import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "./quotes.css";

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
  }

  componentDidMount() {
    this.props.firebase.quotes().onSnapshot(snapshot => {
      if (snapshot.size) {
        let quotes = [];
        snapshot.forEach(doc => quotes.push({ ...doc.data(), uid: doc.id }));
        console.log("printing quotes", quotes);
        const quotesArr = { quotes }.quotes.map(function(quotes) {
          return quotes.quote;
        });
        const authorArr = { quotes }.quotes.map(function(quotes) {
          return quotes.author;
        });
        const randNum = Math.floor(Math.random() * quotesArr.length);
        this.setState({
          quote: quotesArr[randNum],
          author: authorArr[randNum],
        });
        console.log("author " + this.state.author);
        console.log("qupte " + this.state.qupte);
      } else {
        this.setState({ quotes: null });
      }
    });
  }

  render() {
    return (
      <div className="quotesView">
        <h2 className="quoteContent">{this.state.quote}</h2>
        <h3 className="authorContent">{this.state.author}</h3>
      </div>
    );
  }
}

export default withFirebase(Quotes);

import React, { Component } from "react";
import "./App.css";
import Weather from "./weather";
import Clock from "./clock";
import Ticker from "./ticker";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Ticker />
        <Weather />
        <Clock />
      </div>
    );
  }
}

export default App;

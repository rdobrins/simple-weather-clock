import React, { Component } from "react";
import "./App.css";
import Weather from "./weather";
import Clock from "./clock";
import Ticker from "./ticker";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="weather-clock">
          <Weather />
          <Clock />
        </div>
        <Ticker />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Weather from "./weather";
import Clock from "./clock";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather />
        <Clock />
      </div>
    );
  }
}

export default App;

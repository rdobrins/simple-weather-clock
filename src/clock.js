import React from "react";
import "./App.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long"
      }).format(new Date()),
      time: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }).format(new Date())
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      date: new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long"
      }).format(new Date()),
      time: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }).format(new Date())
    });
  }
  render() {
    return (
      <div className="date-clock-container">
        <p className="date">{this.state.date}</p>
        <p className="clock">{this.state.time}</p>
      </div>
    );
  }
}

export default Clock;

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
        minute: "numeric"
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
        minute: "numeric"
      }).format(new Date())
    });
  }
  render() {
    return (
      <div className="date-clock-container">
        <span className="date">{this.state.date}</span>
        <span className="clock">{this.state.time}</span>
      </div>
    );
  }
}

export default Clock;

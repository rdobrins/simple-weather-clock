import React, { Component } from "react";
import { tickerApi } from "./utils";
import "./App.css";

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiresponse: [],
      error: null,
      loaded: false
    };
  }

  componentWillMount() {
    this.getTicker("MSFT,FB,AAPL,AMZN,GOOGL,NFLX,NVDA,TSLA,TWTR,DIS,SBUX,BABA");
  }

  getTicker(query) {
    this.setState({
      error: null,
      loaded: false
    });
    tickerApi(query).then(response => {
      if (response.error) {
        this.setState({
          error: "Unable to get stock quotes. Please try again."
        });
      } else {
        let apiresponse = response;
        this.setState({ apiresponse });
      }
      this.setState({ loaded: true });
    });
  }

  renderTicker() {
    return <p className="ticker-response">{this.state.apiresponse}</p>;
  }

  render() {
    if (this.state.loaded) {
      return <div>{this.renderTicker()}</div>;
    } else {
      return (
        <div className="center-block">
          <span>Loading</span>
        </div>
      );
    }
  }
}

export default Ticker;

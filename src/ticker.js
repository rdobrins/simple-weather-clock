import React, { Component } from "react";
import { tickerApi } from "./utils";
import Slider from "react-slick";
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

  renderTicker(quotes) {
    const settings = {
      infinite: true,
      slidesToShow: 8,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <div>
        <Slider {...settings}>
          {quotes.map(quote => {
            return (
              <div className="ticker-quote">
                <div className="center-ticker">{quote[0]}</div>
                <div className="center-ticker">{quote[1]}</div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }

  render() {
    if (this.state.loaded) {
      return <div>{this.renderTicker(this.state.apiresponse)}</div>;
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

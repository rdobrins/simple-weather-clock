import React, { Component } from "react";
import { weatherApi } from "./utils";
import "./App.css";
import "./dist/wu-icons-style.css";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false
    };
  }

  componentWillMount() {
    this.getWeather("02134");
  }

  getWeather(query) {
    this.setState({
      error: null,
      loaded: false
    });
    weatherApi(query).then(response => {
      if (response.response.error) {
        this.setState({
          error: "Unable to get weather. Please try again."
        });
      } else {
        let current = response.current_observation;
        this.setState({
          temp: current.temp_f.toString(),
          location: current.display_location.full,
          icon: current.icon,
          forcast: response.forecast.simpleforecast.forecastday,
          weather: current.weather
        });
      }
      this.setState({ loaded: true });
    });
  }

  renderWeather() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">{this.state.location}</h4>
              <p className="card-text">
                <br />
                {this.weatherIcon(this.state.icon)}
              </p>
              <h4>{this.state.weather}</h4>
              <h4>{this.state.temp}&deg;</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  weatherIcon(icon) {
    return (
      <i
        className={"wu wu-solid-white wu-128 wu-" + icon + this.dayOrNight()}
      />
    );
  }

  dayOrNight() {
    let hours = new Date().getHours();

    if (hours < 6 || hours > 18) {
      return " wu-night";
    }
  }

  renderForcast() {
    const forcasts = this.state.forcast;
    return (
      <div className="row">
        {forcasts.map(forcast => {
          return (
            <div className="col-md-3" key={forcast.period}>
              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    <br />
                    ======================
                    <br />
                    {forcast.date.weekday} {forcast.date.monthname}{" "}
                    {forcast.date.day}
                    <br />
                    {this.weatherIcon(forcast.icon)}
                  </p>
                  <h4>{forcast.conditions}</h4>
                  <h4>High: {forcast.high.fahrenheit}&deg;</h4>
                  <h4>Low: {forcast.low.fahrenheit}&deg;</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          {this.renderWeather()}
          {this.renderForcast()}
        </div>
      );
    } else {
      return (
        <div className="center-block">
          <span>Loading</span>
        </div>
      );
    }
  }
}

export default Weather;

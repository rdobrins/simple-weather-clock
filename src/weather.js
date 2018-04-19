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
          <div className="card current-weather-card">
            <div className="card-block current-weather-block">
              <div className="temp-icon">
                <span>{this.weatherIcon(this.state.icon, "256")}</span>
                <span className="temp-title">{this.state.temp}&deg;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  weatherIcon(icon, size) {
    return (
      <i
        className={
          "wu wu-solid-white wu-" + size + " wu-" + icon + this.dayOrNight()
        }
      />
    );
  }

  dayOrNight() {
    let hours = new Date().getHours();

    if (hours < 6 || hours > 18) {
      return " wu-night";
    } else {
      return "";
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
                  <div className="day-date">
                    <span className="day-display">{forcast.date.weekday}</span>
                    <span className="date-display">
                      {forcast.date.monthname}
                      &nbsp;
                      {forcast.date.day}
                    </span>
                  </div>
                  <div className="icon-and-high-low">
                    <div className="day-of-week">
                      {this.weatherIcon(forcast.icon, "128")}
                    </div>
                    <div className="highs-and-lows">
                      <h2>{forcast.high.fahrenheit}&deg;</h2>
                      <h1>|</h1>
                      <h2>{forcast.low.fahrenheit}&deg;</h2>
                    </div>
                  </div>
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

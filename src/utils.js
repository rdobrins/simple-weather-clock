import { wunderground_key } from "./config";
import { ticker_key } from "./config";
const _wundergroundURL = "https://api.wunderground.com/api/";
const _APIKEY = wunderground_key; // Get your api key from https://www.wunderground.com/weather/api/
const _baseURL = _wundergroundURL + _APIKEY;
const _alphaVantageURL = "https://www.alphavantage.co/query";

export function weatherApi(query) {
  let url = `${_baseURL}/conditions/forecast/q/${query}.json?`;
  return fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

export function tickerApi(query) {
  let url = `${_alphaVantageURL}?function=BATCH_STOCK_QUOTES&symbols=${query}&apikey="${ticker_key}`;
  return fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => {
      return json["Stock Quotes"].map(x => Object.values(x));
    });
}

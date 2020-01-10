import React, { Component } from "react";
import "./App.css";

const API_KEY = "1d9deb619620418eec6f30e142226d8c";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      wind_speed: undefined,
      feels_like: undefined,
      show: false
    };
    this.getWeather = this.getWeather.bind(this);
  }
  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
    );

    const response = await api_call.json();

    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      country: response.sys.country,
      main: response.weather[0].main,
      temp: response.main.temp,
      temp_max: response.main.temp_max,
      temp_min: response.main.temp_min,
      description: response.weather[0].description,
      wind_speed: response.wind.speed,
      feels_like: response.main.feels_like,
      show: !this.state.show
    });

    console.log(response);
  };

  render() {
    const show = this.state.show;
    return (
      <div>
        <div className="col-md-8 mb">
          <h2> Get Weather</h2>

          <form onSubmit={this.getWeather}>
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="Search your city"
                className="form-control"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="country"
                placeholder="Search your country"
                className="form-control"
                autoComplete="off"
              />
            </div>
            <br />
            <button className="btn btn-danger" type="submit">
              Get Weather
            </button>
          </form>
        </div>
        {show ? (
          <div className="container">
            <div className="card">
              <br />

              <div className="card-body">
                <h5 className="card-title">{this.state.city}</h5>
                <hr />
                <p className="card-text">
                  Temperature is {Math.ceil(this.state.temp - 273)}&deg;;
                </p>
                <hr />
                <p className="card-text">
                  Min temperature is {Math.ceil(this.state.temp_min - 273)}&deg;
                </p>
                <hr />
                <p className="card-text">
                  {" "}
                  Max temperature is {Math.ceil(this.state.temp_max - 273)}&deg;
                </p>
                <hr />

                <p className="card-text">
                  Description:
                  <br />
                  {this.state.description}
                </p>
                <hr />
                <p className="card-text">
                  Wind Speed:
                  <br />
                  {this.state.wind_speed} km/h
                </p>
                <hr />
                <p className="card-text">
                  Feels like:
                  <br />
                  {Math.ceil(this.state.feels_like - 273)}&deg;
                </p>
                <hr />
                <p className="card-text">
                  <small className="text-muted">Last updated {} mins ago</small>
                </p>
              </div>
            </div>

            <br />
            <br />
            <br />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;

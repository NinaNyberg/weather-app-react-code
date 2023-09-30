import React from 'react';
import { createDate } from '../utils/convertDate';

const MyLocationWeather = ({ myLocation, myLocationCurrent }) => {
  return (
    <>
      {myLocation.city && (
        <div className="top">
          <div className="location">
            <p>
              {myLocationCurrent && createDate(myLocationCurrent.dt, 'long')}
            </p>
            <p className="location-name">
              {myLocation.city.name}, {myLocation.city.country}
            </p>
          </div>
          <div className="main-info">
            <div className="temp">
              {myLocation.list ? (
                <h1>{myLocation?.list[0].main?.temp?.toFixed()}°C</h1>
              ) : null}
            </div>
            <div className="description">
              {myLocation.list && (
                <img
                  src={
                    myLocation?.list[0].weather
                      ? `https://openweathermap.org/img/w/${myLocation.list[0].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              )}
              {myLocation.list ? (
                <p className="small">{myLocation?.list[0].weather[0]?.main}</p>
              ) : null}
            </div>
          </div>

          {myLocation.list !== undefined && (
            <div className="bottom">
              <div className="feels">
                {myLocation.list ? (
                  <p className="bold">
                    {myLocation.list[0].main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {myLocation.list ? (
                  <p className="bold">{myLocation.list[0].main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {myLocation.list ? (
                  <p className="bold">{myLocation.list[0].wind.speed}MPS</p>
                ) : null}
                <p>Wind speed</p>
              </div>
            </div>
          )}

          {myLocation.list !== undefined && (
            <>
              <div className="tomorrow">
                <p className="box">Tomorrow</p>
                <p className="bold">
                  {myLocation.list[7].main.temp.toFixed()}°C
                </p>
                <img
                  src={
                    myLocation?.list[7].weather
                      ? `https://openweathermap.org/img/w/${myLocation.list[7].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              </div>
              <div className="tomorrow">
                <p className="box">
                  {myLocation.list && createDate(myLocation.list[14].dt)}
                </p>
                <p className="bold">
                  {myLocation.list[14].main.temp.toFixed()}°C
                </p>
                <img
                  src={
                    myLocation?.list[14].weather
                      ? `https://openweathermap.org/img/w/${myLocation.list[14].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              </div>
              <div className="tomorrow">
                <p className="box">
                  {myLocation.list && createDate(myLocation.list[21].dt)}
                </p>
                <p className="bold">
                  {myLocation.list[21].main.temp.toFixed()}°C
                </p>
                <img
                  src={
                    myLocation?.list[21].weather
                      ? `https://openweathermap.org/img/w/${myLocation.list[21].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MyLocationWeather;

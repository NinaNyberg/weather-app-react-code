import React from 'react';
import { createDate } from '../utils/convertDate';

const LocationAndTemp = ({ data, current }) => {
  return (
    <>
      {data.city && (
        <div className="top">
          <div className="location">
            <p>{current && createDate(current.dt, 'long')}</p>
            <p className="location-name">
              {data?.city?.name}, {data?.city?.country}
            </p>
          </div>
          <div className="main-info">
            <div className="temp">
              {data.list ? (
                <h1>{data.list[0].main?.temp.toFixed()}°C</h1>
              ) : null}
            </div>
            <div className="description">
              {data.list && (
                <img
                  src={
                    data.list[0].weather
                      ? `https://openweathermap.org/img/w/${data?.list[0].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              )}
              {data.list ? (
                <p className="small">{data.list[0].weather[0].main}</p>
              ) : null}
            </div>
          </div>
          {data.list !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.list ? (
                  <p className="bold">
                    {data.list[0].main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {data.list ? (
                  <p className="bold">{data.list[0].main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.list ? (
                  <p className="bold">{data.list[0].wind.speed}MPS</p>
                ) : null}
                <p>Wind speed</p>
              </div>
            </div>
          )}

          {data.list !== undefined && (
            <>
              <div className="tomorrow">
                <p className="box">Tomorrow</p>
                <p className="bold">{data.list[7].main.temp.toFixed()}°C</p>
                <img
                  src={
                    data.list[7].weather
                      ? `https://openweathermap.org/img/w/${data?.list[7].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              </div>

              <div className="tomorrow">
                <p className="box">
                  {data.list && createDate(data.list[14].dt)}
                </p>
                <p className="bold">{data.list[14].main.temp.toFixed()}°C</p>
                <img
                  src={
                    data.list[14].weather
                      ? `https://openweathermap.org/img/w/${data?.list[14].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              </div>
              <div className="tomorrow">
                <p className="box">
                  {data.list && createDate(data.list[21].dt)}
                </p>
                <p className="bold">{data.list[21].main.temp.toFixed()}°C</p>
                <img
                  src={
                    data.list[21].weather
                      ? `https://openweathermap.org/img/w/${data?.list[21].weather[0]?.icon}.png`
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

export default LocationAndTemp;

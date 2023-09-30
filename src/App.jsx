// import axios from 'axios';
import { useState, useEffect } from 'react';
import Search from './components/Search';
import DisplaySeasonImg from './components/DisplaySeasonImg';
import SearchedLocationWeather from './components/SearchedLocationWeather';
import MyLocationWeather from './components/MyLocationWeather';

function App() {
  const [data, setData] = useState({});
  const [current, setCurrent] = useState({});
  //const [location, setLocation] = useState('');
  // const [error, setError] = useState(null);
  const [myLocation, setMyLocation] = useState({});
  const [myLocationCurrent, setMyLocationCurrent] = useState({});

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/forecast`;
  const url_current = `https://api.openweathermap.org/data/2.5/weather`;

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);

    // Search by lat,lon
    // const [lat, lon] = searchData.value.split(' ');
    // let api1 =
    //   url +
    //   '?lat=' +
    //   lat +
    //   '&lon=' +
    //   lon +
    //   '&appid=' +
    //   apiKey +
    //   '&units=metric';

    const loc = searchData.label.split(', ')[0];
    let api = url + '?q=' + loc + '&appid=' + apiKey + '&units=metric';
    let api2 = url_current + '?q=' + loc + '&appid=' + apiKey + '&units=metric';

    const searchedLocationDate = fetch(api2);
    // .then(async (response) => {
    //   const data = await response.json();
    //   setCurrent(data);
    // })
    // .catch((error) => console.log(error));

    const searchedLocationWeather = fetch(api);
    // .then(async (response) => {
    //   const data = await response.json();
    //   setData(data);
    // })
    // .catch((error) => console.log(error));

    Promise.all([searchedLocationDate, searchedLocationWeather])
      .then(async (response) => {
        const todaysDate = await response[0].json();
        const data = await response[1].json();
        setCurrent(todaysDate);
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  // FOR SIMPLE SEARCH WITHOUT AUTOCOMPLETE
  // const searchLocation = async (e) => {
  //   setError(null); // Reset any previous errors
  //   // setLocation({});
  //   setData({});
  //   setMyLocation({});
  //   if (e.key === 'Enter')
  //     if (e.target.value.trim().length) {
  //       // setLocation(e.target.value.trim());
  //       console.log(e.target.value.trim());
  //       console.log(location);
  //       // setData({});
  //       // setMyLocation({});
  //       const url_daily = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
  //       try {
  //         const response = await axios.get(url_daily);
  //         if (response.status === 200) {
  //           setData(response.data);
  //         } else {
  //           setData({});
  //           setLocation('');
  //           setMyLocation({});
  //           setError('No location found :(');
  //         }
  //       } catch (err) {
  //         console.clear();

  //         setLocation('');
  //         setData({});
  //         setMyLocation({});
  //         setError('No location found :( Try again!');
  //         console.log(error);
  //       }
  //       setLocation('');
  //     } else {
  //       setMyLocation({});
  //       setData({});
  //       setLocation('');
  //       setError('You forgot to type the location :)');
  //     }
  // };

  function getWeather() {
    if (window.navigator.geolocation)
      navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      let api =
        url +
        '?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&appid=' +
        apiKey +
        '&units=metric';

      let api2 =
        url_current +
        '?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&appid=' +
        apiKey +
        '&units=metric';

      const myLocationWeather = fetch(api);
      // .then((response) => response.json())
      // .then((weather) => {
      //   setMyLocation(weather);
      // });

      const myLocationDate = fetch(api2);
      // .then(async (response) => {
      //   const data = await response.json();
      //   setMyLocationCurrent(data);
      // })
      // .catch((error) => console.log(error));

      Promise.all([myLocationWeather, myLocationDate])
        .then(async (response) => {
          const weather = await response[0].json();
          const data = await response[1].json();
          setMyLocation(weather);
          setMyLocationCurrent(data);
        })
        .catch((error) => console.log(error));
    }

    function error() {
      setMyLocation({});
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  // function createDate(dt, type) {
  //   let day = new Date(dt * 1000);
  //   if (type === 'long') {
  //     let options = {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric'
  //     };
  //     return day.toLocaleString('en-us', options);
  //   } else {
  //     return day.toLocaleString('en-us', {
  //       weekday: 'long'
  //     });
  //   }
  // }

  return (
    <div
      className={`app ${
        (data.list &&
          (data?.list[0]?.main?.temp < 20
            ? 'animated-bg-cold'
            : data?.list[0]?.main?.temp > 20
            ? 'animated-bg-warm'
            : null)) ||
        (myLocation.list &&
          (myLocation.list[0].main?.temp < 20
            ? 'animated-bg-cold'
            : myLocation.list[0].main?.temp > 20
            ? 'animated-bg-warm'
            : null))
      }`}
    >
      <div className="search">
        <Search onSearchChange={handleOnSearchChange} />
        {/*FOR SIMPLE SEARCH WITHOUT AUTOCOMPLETE */}
        {/* <input
          type="text"
          value={location}
          name="city"
          onChange={(e) => setLocation(e.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter location..."
        /> */}
      </div>

      <DisplaySeasonImg />

      <div className="container">
        {data.city ? (
          <SearchedLocationWeather data={data} current={current} />
        ) : (
          <MyLocationWeather
            myLocation={myLocation}
            myLocationCurrent={myLocationCurrent}
          />
        )}
      </div>
    </div>
  );
}

export default App;

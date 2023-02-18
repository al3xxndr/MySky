import './App.css';

import React, { useState } from 'react';

function WeatherApp() { 
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'UfGABcwcmql6orOCvTC5HGtgsVLJUXNj'; //351197 is the location key for houston

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`)
      .then(response => response.json())
      .then(data => {
        const locationKey = data[0].Key;
        return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?&apikey=${apiKey}&details=${true}`)
      })
      .then(response => response.json())
      .then(data => {
        setWeatherData(data[0]);
      })
      .catch(error => {
        console.error(error);
      })
  }


  return (
    <div className='maindiv'>
      <div className='centerdiv'>
        <div className='enterinput'>
          <form className='formclass' onSubmit={handleSubmit}>
            <label>
              Enter city:
              <input type='text' value={city} onChange={handleCityChange} />
            </label>
            <button type='submit'>Get Weather</button>
          </form>
        </div>

        {weatherData && (
          <div className='infobody'>
            <div className='details'>
              <h1>
                It Is {weatherData.WeatherText} & {' '}
                {weatherData.RealFeelTemperature.Imperial.Phrase}!
              </h1>
              <p>
                Temperature: {weatherData.Temperature.Imperial.Value}{' '}
                {weatherData.Temperature.Imperial.Unit}
              </p>
              <p>
                Feels Like: {weatherData.RealFeelTemperature.Imperial.Value}{' '}
                {weatherData.RealFeelTemperature.Imperial.Unit}
              </p>
              <p>Humidity: {weatherData.RelativeHumidity}</p>
              <p>
                Wind Speed: {weatherData.Wind.Speed.Imperial.Value}{' '}
                {weatherData.Wind.Speed.Imperial.Unit}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;

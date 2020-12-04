import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const WeatherRender = ({ weather }) => {
    return (
        <div>
            <div>{weather.weather_descriptions}</div>
            <div>Temperature: {weather.temperature} &#8451;</div>
            {/* <img src={weather.weather_icons} alt='weather at {city}' /> */}
        </div>
    );
}

const CityWeather = ({ city }) => {
    const [currentWeather, setWeather] = useState(null);

    console.log(currentWeather);

    useEffect(() => {
        console.log('effect');
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
            .then(response => {
                console.log('weather fetched', response.data);
                setWeather(response.data.current);
            })
            .catch(error => {
                console.log(error);
                console.log('Here be errors');
                setWeather(null);
            });
    }, []);

    return (
        <div>
            <h3>Current weather in {city}</h3>
            {currentWeather ? <WeatherRender weather={currentWeather} /> : null}
        </div>
    );

};

export default CityWeather;
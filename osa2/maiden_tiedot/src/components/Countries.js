import React from 'react';
import CityWeather from './CityWeather'

const CountryLine = ({ country, showCountry }) => {
    return (
        <li> {country.name} <button onClick={showCountry}>Show</button></li>
    );
};

const Country = ({ country }) => {
    
    return (
        <div>
            <h2>{country.name}</h2>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>

            <h3>Languages</h3>
            <ul>
                {country.languages.map(lang =>
                    <li key={lang.iso639_2}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag of {country.name}' width="200" />

            <CityWeather city={country.capital}/>
        </div>
    );
};

const Countries = ({ countries, showCountry }) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many mathes, specify another filter
            </div>
        );
    } else if (countries.length <= 10 && countries.length > 1) {
        return (
            <ul>
                {countries.map(country =>
                    <CountryLine key={country.alpha3Code} country={country} showCountry={() => showCountry(country.alpha3Code)} />)}
            </ul>
        );
    } else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        );
    } else {
        return (
            <div>
                No matches!
            </div>
        );
    }
};

export default Countries;
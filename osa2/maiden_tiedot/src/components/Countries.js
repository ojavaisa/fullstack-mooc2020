import React from 'react';

const CountryLine = ({ country }) => {
    return (
        <li> {country.name} </li>
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
            <img src={country.flag} alt="flag" width="200"/>
        </div>
    );
};

const Countries = ({ countries }) => {
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
                    <CountryLine key={country.alpha3Code} country={country} />)}
            </ul>
        );
    } else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]}/>
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
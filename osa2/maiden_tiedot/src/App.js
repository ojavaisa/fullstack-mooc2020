import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries'

const App = () => {
    const [filterString, setFilterString] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        console.log('effect');
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled');
                setCountries(response.data);
            });
    }, []);
    //console.log('found', countries.length, 'countries');
    //console.log(countries);

    const filterCountries = (event) => {
        setFilterString(event.target.value);
    };

    const countriesToShow = (filterString.length > 0)
        ? countries.filter(country =>
            country.name.toLowerCase().includes(filterString.toLowerCase()))
        : countries;

    return (
        <div>
            <h2>Country facts</h2>

            <Filter filterString={filterString} filterCountries={filterCountries} />

            <Countries countries={countriesToShow} />
            {/* <div>debug {countriesToShow.length}</div> */}
        </div>
    );

};

export default App;

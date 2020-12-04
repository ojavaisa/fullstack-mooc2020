import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
    const [filterString, setFilterString] = useState('');
    const [countries, setCountries] = useState([]);
    const [countryClicked, setClicked] = useState('');

    useEffect(() => {
        //console.log('effect');
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                //console.log('promise fulfilled');
                setCountries(response.data);
            });
    }, []);
    //console.log('found', countries.length, 'countries');
    //console.log(countries);

    const filterCountries = (event) => {
        setFilterString(event.target.value);
        setClicked('');
    };

    const showCountryCliked = (event) => {
        //console.log('Clicked! ', event);
        setClicked(event);
        setFilterString('');
    };

    const countriesToShow = (countryClicked.length === 0)
        ? ((filterString.length > 0) //if no country clicked, filter by filterString
            ? countries.filter(country =>
                country.name.toLowerCase().includes(filterString.toLowerCase()))
            : countries)
        : countries.filter(country => country.alpha3Code === countryClicked);
    // console.log(countriesToShow);

    return (
        <div>
            <h2>Country facts</h2>

            <Filter filterString={filterString} filterCountries={filterCountries} />

            <Countries countries={countriesToShow} showCountry={showCountryCliked} />
            {/* <div>debug {countriesToShow.length}</div> */}
        </div>
    );

};

export default App;

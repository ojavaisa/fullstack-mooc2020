import React from 'react';

const Filter = ({ filterString, filterCountries }) => {
    return (
        <div>
            find countries <input value={filterString} onChange={filterCountries} />
        </div>
    );
};

export default Filter;
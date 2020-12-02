import React from 'react';

const Filter = ({ filterString, filterPeople }) => {
    return (
        <div>
            filter shown with <input value={filterString} onChange={filterPeople} />
        </div>
    );
};

export default Filter;
import React from 'react';

const Person = ({ person, remove }) => {
    return (
        <li>
            {person.name} - {person.number} <button onClick={remove}>Delelte</button>
        </li>
    );
};

export default Person;
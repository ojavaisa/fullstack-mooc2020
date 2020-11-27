import React from 'react';

const Person = ({ person }) => {
    return (
        <li>
            {person.name}
        </li>
    );
};

const Persons = ({ persons }) => {
    return(
        <ul>
            {persons.map(person =>
                <Person key={person.name} person={person} />
            )}
        </ul>
    );
};

export default Persons;
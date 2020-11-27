import React from 'react';

const Person = ({ person }) => {
    return (
        <li>
            {person.name} - {person.number}
        </li>
    );
};

const People = ({ people }) => {
    return(
        <ul>
            {people.map(person =>
                <Person key={person.name} person={person} />
            )}
        </ul>
    );
};

export default People;
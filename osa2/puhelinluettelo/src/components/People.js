import React from 'react';
import Person from './Person';

const People = ({ people }) => {
    return (
        <ul>
            {people.map(person =>
                <Person key={person.name} person={person} />
            )}
        </ul>
    );
};

export default People;
import React from 'react';
import Person from './Person';

const People = ({ people, removePerson }) => {
    return (
        <ul>
            {people.map(person =>
                <Person key={person.id} person={person} remove={() => removePerson(person)}/>
            )}
        </ul>
    );
};

export default People;
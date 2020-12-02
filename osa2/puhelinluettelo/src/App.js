import React, { useState } from 'react';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter'

const App = () => {
    const [people, setPeople] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterString, setFilterString] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        if (people.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook.`);
            setNewName('');
            setNewNumber('');
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            };
            setPeople(people.concat(personObject));
            setNewName('');
            setNewNumber('');
        }
    };

    const handleNameChange = (event) => {
        //console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        //console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const filterPeople = (event) => {
        setFilterString(event.target.value);
    };

    const peopleToShow = (filterString.length > 0)
        ? people.filter(person =>
            person.name.toLowerCase().startsWith(filterString.toLowerCase()))
        : people;

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filterString={filterString} filterPeople={filterPeople} />

            <h3>Add a new person</h3>
            <PersonForm 
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            
            <h2>Numbers</h2>
            <ul>
                {peopleToShow.map(person =>
                    <Person key={person.name} person={person} />
                )}
            </ul>
        </div>
    );

};

export default App;
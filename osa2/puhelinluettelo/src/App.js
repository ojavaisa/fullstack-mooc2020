import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import People from './components/People';
import personsService from './services/persons';

const App = () => {
    const [people, setPeople] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterString, setFilterString] = useState('');

    useEffect(() => {
        //console.log('effect');
        personsService
            .getAll()
            .then(initialPeople => {
                setPeople(initialPeople);
            })
            .catch(error => {
                console.log('There was an error getting initial people');
            });
    }, []);
    //console.log('render', people.length, 'people');

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
            personsService
                .create(personObject)
                .then(returnedPerson => {
                    setPeople(people.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                })
                .catch(error => {
                    console.log('There was an error in posting new person.');
                });
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
            <People people={peopleToShow} />
        </div>
    );

};

export default App;
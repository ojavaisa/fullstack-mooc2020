import React, { useState } from 'react';
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1231244' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        if(persons.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook.`)
            setNewName('');
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject));
            setNewName('');
            setNewNumber('');
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div><button type="submit">add</button></div>
            </form>
            <h2>Numbers</h2>
            <div>debug: {newName}</div>
            <Persons persons={persons}/>
        </div>
    );

};

export default App;
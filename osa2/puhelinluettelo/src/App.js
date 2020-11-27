import React, { useState } from 'react';
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        if(persons.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook.`)
            setNewName('');
        } else {
            const personObject = {
                name: newName
            }
            setPersons(persons.concat(personObject));
            setNewName('');
        }
    }

    const handleFormChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleFormChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>debug: {newName}</div>
            <Persons persons={persons}/>
        </div>
    );

};

export default App;
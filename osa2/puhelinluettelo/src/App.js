import React, { useState } from 'react';
import People from './components/People'

const App = () => {
    const [people, setPeople] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [peopleToShow, setPeopleToShow] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        if(people.map(person => person.name).includes(newName)) {
            alert(`${newName} is already added to phonebook.`)
            setNewName('');
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPeople(people.concat(personObject));
            setNewName('');
            setNewNumber('');
        }
    }

    const handleNameChange = (event) => {
        //console.log(event.target.value);
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        //console.log(event.target.value);
        setNewNumber(event.target.value);
    }

    const filterPeople = (event) => {
        const peopleToShow = people.filter(person => 
            person.name.toLowerCase().startsWith(event.target.value.toLowerCase()));
        console.log(peopleToShow);
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <div>filter shown with <input onChange={filterPeople}/></div>

            <h3>Add a new person</h3>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div><button type="submit">add</button></div>
            </form>
            <h2>Numbers</h2>
            <div>debug: {newName}</div>
            <People people={people}/>
        </div>
    );

};

export default App;
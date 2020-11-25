import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    );
};

const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>Number of exercises {sum}</p>
    );
};

const Part = ({ part }) => {
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    );
};

const Content = ({ course }) => {
    return (
        <ul>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </ul>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    };

    return (
        <div>
            <Course course={course} />
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
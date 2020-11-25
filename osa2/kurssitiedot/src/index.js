import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => {
    return (
        <h1>{header}</h1>
    );
};

const CourseHeader = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    );
};

const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <b>Number of exercises {sum}</b>
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
            <CourseHeader course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

const App = () => {
    const header = 'Web development curriculum';
    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            <Header header={header} />
            {courses.map(course =>
                <Course key={course.id} course={course} />
            )}
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
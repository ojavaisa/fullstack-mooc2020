import React from 'react';

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

export default Course
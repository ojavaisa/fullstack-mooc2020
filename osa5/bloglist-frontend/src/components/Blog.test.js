import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    const user = {
      name: 'Blog Enthusiast',
      username: 'bloglover69'
    };
    const blog = {
      title: 'Testing Blog',
      author: 'Testy McTestface',
      url: 'testingtesting.com',
      likes: 7,
      user: user
    };

    mockHandler = jest.fn();

    component = render(
      <Blog blog={blog} addLike={mockHandler}/>
    );

  });

  test('initially only shows blog title and author', () => {
    let div = component.container.querySelector('.blog');

    expect(div).toHaveTextContent('Testing Blog');
    expect(div).toHaveTextContent('Testy McTestface');

    div = component.container.querySelector('.blogFullInfo');
    expect(div).toHaveStyle('display: none');
  });

  test('shows url and likes after "View" button is clicked', () => {
    let div = component.container.querySelector('.blogFullInfo');

    expect(div).toHaveTextContent('testingtesting.com');
    expect(div).toHaveTextContent('7');

    const button = component.getByText('View');
    fireEvent.click(button);

    expect(div).not.toHaveStyle('display: none');
  });

  test('pressing like twice fires the handler function the correct amount of times', () => {

    const button = component.getByText('Like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
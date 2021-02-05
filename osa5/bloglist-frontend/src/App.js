import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(compareLikes))
    ).catch(error => {
      console.log('There was an error getting initial blogs', error.message);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []); //empty list as a second parameter means that effect only performed only when component is rendered the first time

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );

      setUser(user);  //loginService returns a user object that includes token
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      //setErrorMessage
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">Login</button>
    </form>
  );

  const blogFormRef = useRef(); //ref to use Togglable's visibility variable outside Togglable (namely in blogForm, to hide form when submitting)

  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>  {/* Blog form now only visible when toggled */}
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility();

    const response = await blogService.create(blogObject);
    setBlogs(blogs.concat(response).sort(compareLikes));
  };

  const addLike = async (likedBlog) => {
    const response = await blogService.addLike(likedBlog);
    setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : response).sort(compareLikes));
  };

  const compareLikes = (blogA, blogB) => blogB.likes - blogA.likes;

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Do you want to remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        //blogService sends token and backend checks that the user is authorized to remove blog
        await blogService.remove(blogToDelete);
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id).sort(compareLikes));
      } catch (exception) {
        console.log('There was an error deleting person', exception);
      }
    }

  };

  return (
    <div>
      <h2>Blogs</h2>

      {user === null ?  //depending on if user is logged in
        loginForm() :   //show either loginForm
        <div>           {/* or name of user, button/form to add new blog and list of blogs */}
          <p>{user.name} logged in <button type="button" onClick={handleLogout}>Logout</button> </p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              addLike={() => addLike(blog)}
              deleteBlog={() => deleteBlog(blog)}
              showDelete={user.username === blog.user.username} />
          )}
        </div>
      }
    </div>
  );
};

export default App;
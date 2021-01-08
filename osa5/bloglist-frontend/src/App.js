import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password,
      });
      setUser(user);  //loginService returns a user object that includes token 
      setUsername('');
      setPassword('');
    } catch (exception) {
      //setErrorMessage
    }
  };

  // const addBlog = () => {

  // };

  // const newBlog = () => {

  // };

  // const handleBlogChange = () => {

  // };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <input
  //       value={newBlog}
  //       onChange={handleBlogChange}
  //     />
  //     <button type="submit">Save</button>
  //   </form>
  // );

  return (
    <div>
      <h2>Blogs</h2>

      {user === null ?  //depending on if user is logged in
        loginForm() :   //show either loginForm
        <div>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>  // or name of user and list of blogs
      }
    </div>
  );
};

export default App;
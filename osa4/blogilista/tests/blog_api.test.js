const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

let token;

beforeAll(async () => {
  await User.deleteMany({});

  const testUser = {
    username: 'testuser',
    password: 'abcd1234',
    name: 'Test User'
  };

  await api.post('/api/users').send(testUser);
  //console.log(savedUser.body);

  const loggedInUser = await api.post('/api/login').send({
    username: 'testuser',
    password: 'abcd1234'
  });
  //console.log(loggedInUser.body);
  token = loggedInUser.body.token;
  //console.log(token);
});

beforeEach(async () => {
  await Blog.deleteMany({});

  // const blogObjects = initialBlogs.map(blog => new Blog(blog));
  // const promiseArray = blogObjects.map(blog => blog.save());
  // await Promise.all(promiseArray);
  await Blog.insertMany(helper.initialBlogs);  // do the above more easily with mongoose's insertMany method... xD
});

describe('when getting initial blogs already saved', () => {
  test('blog entries are returned as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)  // 'OK'
      .expect('Content-Type', /application\/json/); // /.../ defines a regular expression, \/ is an escaped character /
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blog id field is named correctly', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('when adding a new blog', () => {
  describe('with a valid login', () => {

    test('a blog with valid fields can be added', async () => {
      const newBlog = {
        title: 'Callback Hell',
        author: 'Max Ogden',
        url: 'http://callbackhell.com/',
        likes: 5
      };

      await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)  // 'OK'
        .expect('Content-Type', /application\/json/);

      const response = await api.get('/api/blogs');
      const titles = response.body.map(blog => blog.title);
      const urls = response.body.map(blog => blog.url);

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
      expect(titles).toContain(
        'Callback Hell'
      );
      expect(urls).toContain(
        'http://callbackhell.com/'
      );
    });

    test('blog without likes gets zero as default', async () => {
      const newBlog = {
        title: 'Callback Hell',
        author: 'Max Ogden',
        url: 'http://callbackhell.com/'
      };

      const response = await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)  // 'OK'
        .expect('Content-Type', /application\/json/);

      expect(response.body.likes).toEqual(0);
    });

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'Max Ogden',
        url: 'http://callbackhell.com/',
        likes: 5
      };

      await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400);  // 'Bad request'

      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('blog without url is not added', async () => {
      const newBlog = {
        title: 'Callback Hell',
        author: 'Max Ogden',
        likes: 5
      };

      await api.post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400);  // 'Bad request'

      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('without valid login', () => {
    test('a blog with valid fields is not added and correct status code is returned', async () => {
      const newBlog = {
        title: 'Callback Hell',
        author: 'Max Ogden',
        url: 'http://callbackhell.com/',
        likes: 5
      };

      await api.post('/api/blogs')
        //.set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(401);  // 'Unauthorized'

      const response = await api.get('/api/blogs');

      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });
  });
});

describe('deleting a blog', () => {

  let blogToDelete;
  beforeEach(async () => {
    const newBlog = {
      title: 'Callback Hell',
      author: 'Max Ogden',
      url: 'http://callbackhell.com/',
      likes: 5
    };
    //Post a new blog as logged in user
    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog);
    blogToDelete = response.body;
  });

  describe('with valid login', () => {

    test('succeeds with valid id', async () => {
      let response = await api.get('/api/blogs');
      const blogsAtStart = response.body;
      expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1);
      /*const blogToDelete = blogsAtStart[0];
      console.log(blogsAtStart);
      console.log(blogToDelete.id); */
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);

      response = await api.get('/api/blogs');
      const blogsAtEnd = response.body;

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

      const titles = blogsAtEnd.map(blog => blog.title);
      expect(titles).not.toContain(blogToDelete.title);
    });

    test('does nothing with valid, but nonexistent id', async () => {
      let response = await api.get('/api/blogs');
      const blogsAtStart = response.body;
      const titlesAtStart = blogsAtStart.map(blog => blog.title);

      await api
        .delete(`/api/blogs/${helper.nonExistentId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(404); //'Not found'

      response = await api.get('/api/blogs');
      const blogsAtEnd = response.body;

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titlesAtEnd = blogsAtEnd.map(blog => blog.title);
      expect(titlesAtEnd).toEqual(titlesAtStart);
    });

    test('returns correct status code and does nothing else with incorrectly formatted id', async () => {
      let response = await api.get('/api/blogs');
      const blogsAtStart = response.body;
      const titlesAtStart = blogsAtStart.map(blog => blog.title);
      const totallyWrongId = '123456';

      await api
        .delete(`/api/blogs/${totallyWrongId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(400); //'Bad request'

      response = await api.get('/api/blogs');
      const blogsAtEnd = response.body;

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titlesAtEnd = blogsAtEnd.map(blog => blog.title);
      expect(titlesAtEnd).toEqual(titlesAtStart);
    });
  });

  describe('without valid login', () => {
    test('fails even with valid blog id', async () => {
      let response = await api.get('/api/blogs');
      const blogsAtStart = response.body;
      const blogToDelete = blogsAtStart[0];

      await api
        //.set('Authorization', `bearer ${token}`)
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401); //'Unauthorized'

      response = await api.get('/api/blogs');
      const blogsAtEnd = response.body;

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map(blog => blog.title);
      expect(titles).toContain(blogToDelete.title);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
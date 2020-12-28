const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
];
beforeEach(async () => {
  await Blog.deleteMany({});

  // const blogObjects = initialBlogs.map(blog => new Blog(blog));
  // const promiseArray = blogObjects.map(blog => blog.save());
  // await Promise.all(promiseArray);
  await Blog.insertMany(initialBlogs);  // do the above more easily with mongoose's insertMany method... xD
});

test('blog entries are returned as JSON', async () => {
  await api.get('/api/blogs')
    .expect(200)  // 'OK'
    .expect('Content-Type', /application\/json/); // /.../ defines a regular expression, \/ is an escaped character /
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('blog id field is named correctly', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'Callback Hell',
    author: 'Max Ogden',
    url: 'http://callbackhell.com/',
    likes: 5
  };

  await api.post('/api/blogs').send(newBlog)
    .expect(200)  // 'OK'
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(blog => blog.title);
  const urls = response.body.map(blog => blog.url);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
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

  const response = await api.post('/api/blogs').send(newBlog)
    .expect(200)  // 'OK'
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toEqual(0);
});

afterAll(() => {
  mongoose.connection.close();
});
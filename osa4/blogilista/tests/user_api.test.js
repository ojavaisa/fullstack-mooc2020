const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
//const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('salasana123', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a new username', async () => {
    let response = await api.get('/api/users');
    const usersAtStart = response.body;

    const newUser = {
      username: 'ojavaisa',
      name: 'Olli Väisänen',
      password: 'password1',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    response = await api.get('/api/users');
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails if username already taken', async () => {
    let response = await api.get('/api/users');
    const usersAtStart = response.body;

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)  //'Bad request'
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    response = await api.get('/api/users');
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails if username is too short', async () => {
    let response = await api.get('/api/users');
    const usersAtStart = response.body;

    const newUser = {
      username: 'su',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)  //'Bad request'
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username');  // check that error at least mentions username

    response = await api.get('/api/users');
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails if password is too short', async () => {
    let response = await api.get('/api/users');
    const usersAtStart = response.body;

    const newUser = {
      username: 'superuser',
      name: 'Superuser',
      password: 'pw',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)  //'Bad request'
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password');  // check that error at least mentions password

    response = await api.get('/api/users');
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails if password is missing', async () => {
    let response = await api.get('/api/users');
    const usersAtStart = response.body;

    const newUser = {
      username: 'superuser',
      name: 'Superuser'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)  //'Bad request'
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password');  // check that error at least mentions password

    response = await api.get('/api/users');
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails if username is missing', async () => {
    let response = await api.get('/api/users');
    const usersAtStart = response.body;

    const newUser = {
      name: 'Superuser',
      password: 'salainen'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)  //'Bad request'
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username');  // check that error at least mentions username

    response = await api.get('/api/users');
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
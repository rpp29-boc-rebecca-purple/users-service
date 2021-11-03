const app = require('../../server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('User Endpoints', () => {
  describe('GET User Profile', () => {

    it('should return a user profile', async () => {
      const response = await request.get('/user?email=meow@dog.com');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });

    it('should return a 400 status code for invalid email', async () => {
      const response = await request.get('/user?email=Rick');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
      expect(response.text).toBe('Unable to get user profile based on email');
    });

    it('should return a 400 status code for missing email', async () => {
      const response = await request.get('/user/');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
    });
  });

  describe('PUT Edit User Profile', () => { // to update
    xit('should return a 200 status', async () => {
      const response = await request.put('/user/edit?email=meow@dog.com').send({ first_name: 'Jest', last_name: 'Jester', age: '123', snack: 'those green eyes of yours' });
      expect(response.status).toBe(200);
    });
  });
});

describe('Friends Endpoints', () => {
  xdescribe('GET Friend List', () => {

    it('should return a 200 status', async () => {
      const response = await request.get('/user/friendsList?email=Joe');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });

    it('should return a 400 status code for invalid email', async () => {
      const response = await request.get('/user/friendsList?email=Rick');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
    });

    it('should return an empty array for an empty friends list', async () => {
      const response = await request.get('/user/friendsList?email=Joe');

      expect(response.status).toBe(404);
      expect(Array.isArray(response.body)).toBe(false);
    });
  });

  describe('GET Search Friend', () => {

    it('should return a user profile based on email', async () => {
      const response = await request.get('/searchFriend?email=chirp@dog.com');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });

    it('should return a 400 status code for invalid email', async () => {
      const response = await request.get('/searchFriend?email=rick');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
      expect(response.text).toBe('Unable to get user profile based on email');
    });

    it('should return a 400 status code for missing email', async () => {
      const response = await request.get('/searchFriend/');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
    });
  });

  xdescribe('POST/PUT Follow Friend', () => {
    it('should return a 400 status code for invalid email', async () => {
      const response = await request.put('/user/friendsList/follow');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
    });

    it('should return a 404 status code for missing email', async () => {
      const response = await request.get('/user/');

      expect(response.status).toBe(404);
      expect(Array.isArray(response.body)).toBe(false);
    });
  });

  xdescribe('POST/PUT Unfollow Friend', () => {

    it('shoud return a 200 status code', async () => {
      const response = await request.put('/user/friendsList/unfollow');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });
  });
});





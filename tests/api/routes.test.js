const app = require('../../server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('User Endpoints', () => {
  describe('GET User Profile', () => {

    xit('should return a user profile', async () => {
      const response = await request.get('/user?user_id=1');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });

    it('should return a 400 status code for invalid user_id', async () => {
      const response = await request.get('/user?user_id=3454576');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
      expect(response.text).toBe('Unable to get user profile based on user_id');
    });

    it('should return a 400 status code for missing user_id', async () => {
      const response = await request.get('/user/');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
    });
  });

  describe('PUT Edit User Profile', () => {
    xit('should return a 200 status', async () => {
      const response = await request.put('/user/edit?user_id=1').send({ data: {first_name: 'Jest', last_name: 'Jester', age: 123, snack: 'those green eyes of yours', animal_type: 'snek' }});
      expect(response.status).toBe(200);
    });
  });
});

describe('Friends Endpoints', () => {
  describe('GET Friend List', () => {

    xit('should return a 200 status', async () => {
      const response = await request.get('/user/friendsList?user_id=2');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      // expect(response.body.length).toBe(1);
    });

    xit('should return an empty array for an empty friends list', async () => {
      const response = await request.get('/user/friendsList?user_id=3');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  xdescribe('GET Search Friend', () => {

    it('should return a user profile based on user_id', async () => {
      const response = await request.get('/searchFriend?user_id=2');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });

    it('should return a 400 status code for invalid user_id', async () => {
      const response = await request.get('/searchFriend?user_id=23534');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
      expect(response.text).toBe('Unable to get user profile based on user_id');
    });

    it('should return a 400 status code for missing user_id', async () => {
      const response = await request.get('/searchFriend/');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
    });
  });

  xdescribe('POST Follow Friend', () => {
    it('should return a 404 status code for invalid user_id', async () => {
      const response = await request.put('/user/friendsList/follow');

      expect(response.status).toBe(404);
      expect(Array.isArray(response.body)).toBe(false);
    });

    it('should return a 400 status code for missing user_id', async () => {
      const response = await request.get('/user/');

      expect(response.status).toBe(400);
      expect(Array.isArray(response.body)).toBe(false);
    });
  });

  xdescribe('PUT Unfollow Friend', () => {

    xit('shoud return a 200 status code', async () => {
      const response = await request.put('/user/friendsList/unfollow?user_id=1&friend_id=2');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });
  });
});





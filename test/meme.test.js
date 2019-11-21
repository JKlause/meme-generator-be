require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/model/Meme');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  async function postAMeme() {
    let userId;

    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'abc' })
      .then(res => {
        userId = res.body._id;
      });


    const meme = { 
      topText: 'Joe',
      bottomText: 'Dog', 
      imageUrl: 'Cat', 
      user: userId 
    };


    const result =  await agent
      .post('/api/v1/meme')
      .send(meme)
      .then(res => res.body);

    return { result, meme, agent };
  }

  it('can create a meme model with appropriate input', async()=> {

    await postAMeme()
      .then(({ result, meme }) => {
        expect(result).toEqual({
          ...meme,
          __v: 0,
          _id: expect.any(String)
        });
      });
  }); 

  it('can get a meme by id', async()=> {
    let agentLocal;
    let meme;

    await postAMeme()
      .then(({ result, agent }) => {
        agentLocal = agent;
        meme = result;
      });

    await agentLocal
      .get(`/api/v1/meme/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...meme
        });
      });
  });

  it('can get all memes', async()=> {
    let agentLocal;
    let meme;

    await postAMeme()
      .then(({ result, agent }) => {
        agentLocal = agent;
        meme = result;
      });

    await agentLocal
      .get('/api/v1/meme')
      .then(res => {
        expect(res.body[0]).toEqual({
          ...meme
        });
      });
  }); 

  it('can delete a meme by id', async()=> {
    let agentLocal;
    let meme;

    await postAMeme()
      .then(({ result, agent }) => {
        agentLocal = agent;
        meme = result;
      });

    await agentLocal
      .delete(`/api/v1/meme/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...meme
        });
      });
    await agentLocal
      .get(`/api/v1/meme/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual(null);
      });
  });

});

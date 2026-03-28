import {describe,it,expect} from 'vitest';
import request from 'supertest';
import app from './server.js';

describe('POST /register', () => {
it('should create a new user when given a name', async() => {
    const response = await request(app)
    .post('/register')
    .send({
            name: 'alice',
            email: `name-${Date.now()}@example.com`, //Unique email every time
            password: 'Password123!'
        });

    expect(response.status).toBe(201);

    expect(response.body.name).toBe('alice');
    expect(response.body.id).toBeDefined();
    console.log("server response body",response.body)
})

it('should return an error if the email already exists', async() => {
    const email = 'example@gmail.com'
    await request(app).post('/register').send({name : 'user1', email ,password: 'fuidbnf87uhewu8b'})
    const response = await request(app)
    .post('/register')
    .send({name: 'user2',  email, password: 'nsid87fhwefn7wehb7'})

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('unauthorized, email already exists')
});
});
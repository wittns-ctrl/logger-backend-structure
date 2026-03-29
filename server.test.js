import {describe,it,expect, beforeAll} from 'vitest';
import request from 'supertest';
import app from './server.js';

/*describe('POST /register', () => {
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
describe('POST /login', ()=> {
    const validuser = {
        email: "test-@example",
        password: "password123!"
    }

    beforeAll(async()=>{
        await request(app)
        .post('/register')
        .send({
            name:"test user",
            email: validuser.email,
            password: validuser.password
        })
    })
    it("it should return 200 if token given for valid credentials", async()=>{
        const response =  await request(app)
        .post('/login')
        .send(validuser);

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('Access_token')
        expect(typeof response.body.Access_token).toBe('string')
        expect(response.body.Access_token.length).toBeGreaterThan(10)
    })
})



describe('POST /tasks', () =>{

    it("should create a new tasks when given a title", async() => {
        const task = {
            title:"shuttle",
            description: "my book is goated",
            status: "pending",
            priority: 4
        }
        const response =  await request(app)
        .post('/tasks')
        .send(task);

        expect(response.status).toBe(201)
        expect(response.body).toMatchObject({
            title:"shuttle",
            description: "my book is goated",
            status: "pending",
            priority: 4
        })
        console.log("server response:",response.body)
    })
})*/
describe('POST /register',()=>{
    let token;
    const validUser = {
       email:`name-${Date.now()}@example.com`,
       password:"password123!"
    }
    it("returns 200 when name is given", async()=>{
        const response = await request(app)
        .post('/register')
        .send({
            name:"userlester",
            email: validUser.email,
            password: validUser.password
        })
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("user created successfully")
        expect(response.body.id).toBeDefined();
    })
    it("returns 200 if token given for valid credentials",async()=>{
        const response = await request(app)
        .post('/login')
        .send(validUser)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('Access_token')
        expect(typeof response.body.Access_token).toBe('string')
        expect(response.body.Access_token.length).toBeGreaterThan(10)
    })
    it("returns 201 when title is given",async()=>{
        const response = await request(app)
        .post('/tasks')
        .send({
            title:"shutter moi",
            description:"aoiw98en98whe",
            status: "pending",
            priority: 3
        })

        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
        expect(response.body.title).toBe("shutter moi")
    })
})

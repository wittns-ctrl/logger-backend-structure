import {describe,it,expect, beforeAll} from 'vitest';
import request from 'supertest';
import app from './server.js';

describe('task API integration (POST & GET)',()=>{
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
        token = response.body.Access_token
        expect(typeof token).toBe('string')
        expect(response.body.Access_token.length).toBeGreaterThan(10)
    })
    it("returns 201 when title is given",async()=>{
        const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title:"shutter moi",
            description:"aoiw98en98whe",
            status: "pending",
            priority: 3
        })

        expect(response.status).toBe(201)
        expect(response.body.title).toBe("shutter moi")
    })

    it("returns 200 if title is given",async()=>{
        const response = await request(app)
        .get("/tasks")
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
    })
})

/* eslint-disable */
const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('./app');

const userModel = require('./api/users/users.model');
const listModel = require('./api/lists/lists.model');
const { createUser, updateUser } = require('./api/users/users.service');
const { createList } = require('./api/lists/lists.service');
 
const request = supertest(app);

describe('Index testing', () => {
    let user, list, token;
    beforeAll(async () => {
        user = await createUser({
            email: "testing@email.com",
            password: "testing"
        });

        const fav = {
            title: "Fav Title",
            description: "Fav Description",
            link: "https://www.fav.com",
        }
        
        list = await createList({
            refUser: user._id,
            name: "Test List",
            favs: [fav],
        });

        await updateUser(user._id, { favs: [list._id] });

        token = await jwt.sign(user.profile, process.env.JWT_SECRET_KEY);
    });

    afterAll(async () => {
        await listModel.deleteMany({ refUser: user._id });
        await userModel.deleteMany({ email: 'testing@email.com' });
        await userModel.deleteMany({ email: 'testing1@email.com' });
        await mongoose.connection.close();
    });

    describe('User API testing', () => {
        it('GET /api/users should return status code 200 and array', async() => {
            const response = await request.get('/api/users').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('GET /api/users should return status code 401 and error msg', async() => {
            const response = await request.get('/api/users');
            expect(response.status).toBe(401);
            expect(response.body).toBe('Unauthorized');
        })

        it('GET /api/users/:id should return object and status code 200', async() => {
            const response = await request.get(`/api/users/${user._id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        })

        it('GET /api/users/:id should return status code 404', async() => {
            const response = await request.get(`/api/users/123`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        })

        it('POST /api/users should return status code 201 and Object', async() => {
            const response = await request.post('/api/users')
                .send({ email: "testing1@email.com", password: "testing" });
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
        })

        it('POST /api/users should return status code 500 and error msg', async() => {
            const response = await request.post('/api/users').send({
                email: "testing@email.com",
            });
            expect(response.status).toBe(500);
            expect(response.body).toBe('User validation failed: password: Path `password` is required.');
        })

        it('PATCH /api/users/:id should return status code 200 and Object', async() => {
            const response = await request.patch(`/api/users/${user._id}`)
                .send({ password: "Test User" })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        })

        it('PATCH /api/users/:id should return status code 500', async() => {
            const response = await request.patch(`/api/users/123`)
                .send({ password: "Test User" })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
        })

        // it('DELETE /api/users/:id should return status code 200 and Object', async() => {
        //     const response = await request.delete(`/api/users/${user._id}`)
        //         .set('Authorization', `Bearer ${token}`);
        //     expect(response.status).toBe(200);
        //     expect(response.body).toBeInstanceOf(Object);
        // })
    })

    describe('Lists API testing', () => {
        it('GET /api/lists should return status code 200 and array', async() => {
            const response = await request.get('/api/lists').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })

        it('GET /api/lists should return status code 401 and error msg', async() => {
            const response = await request.get('/api/lists');
            expect(response.status).toBe(401);
            expect(response.body).toBe('Unauthorized');
        })

        it('GET /api/lists/:id should return object and status code 200', async() => {
            const response = await request.get(`/api/lists/${list._id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        })

        it('GET /api/lists/:id should return status code 404', async() => {
            const response = await request.get(`/api/lists/123`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        })

        it('POST /api/lists should return status code 201 and Object', async() => {
            const response = await request.post('/api/lists')
                .send({ refUser: user._id, name: "Test List" })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
        })

        it('POST /api/lists should return status code 500 and error msg', async() => {
            const response = await request.post('/api/lists').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
            expect(response.body).toBe('List validation failed: name: Path `name` is required.');
        })

        it('PATCH /api/lists/:id should return status code 200 and Object', async() => {
            const response = await request.patch(`/api/lists/${list._id}`)
                .send({
                    refUser: user._id,
                    name: "Test List",
                    favs: [{
                        title: "Fav Title",
                        description: "Fav Description",
                        link: "https://www.fav.com",
                    }],
                })
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        })
    });
});

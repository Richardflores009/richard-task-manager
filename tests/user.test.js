const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Richard',
        email: 'richard32@example.com',
        password: 'myPass777!'
    }).expect(201)
})
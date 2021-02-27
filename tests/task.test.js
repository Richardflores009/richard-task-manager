const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userIdOne, userOne, userTwo, taskOne,setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should show all user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
})

test('Should fail when second use deletes first user task', async () => {
    await request(app)
        .delete(`/tasks/${userIdOne}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send(taskOne)
        .expect(404)
    
    const task = await Task.findById(taskOne._id)
        expect(task).not.toBeNull()
        // expect(taskOne.description).toEqual(response.body.description)
})

test('Should not create task with invalid decription', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: ''
        })
        .expect(400)
})

test('Should not update task with invalid description', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: ''
        })
        .expect(400)
})
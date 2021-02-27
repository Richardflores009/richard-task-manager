const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userIdOne = new mongoose.Types.ObjectId()

const userOne = {
    _id: userIdOne,
    name: 'John',
    email: 'john@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userIdOne }, process.env.JWT_SECRET)
    }]
}

const userIdTwo = new mongoose.Types.ObjectId()

const userTwo = {
    _id: userIdTwo,
    name: 'Richard',
    email: 'choopydoo@example.com',
    password: 'oasdfjfhj33!!',
    tokens: [{
        token: jwt.sign({ _id: userIdTwo }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await User(userOne).save()
    await User(userTwo).save()
    await Task(taskOne).save()
    await Task(taskTwo).save()
    await Task(taskThree).save()
}

module.exports = {
    userIdOne,
    userOne,
    userTwo,
    setupDatabase,
    taskOne,
    taskTwo,
    taskThree
}
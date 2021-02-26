const express = require('express')
const Task = require('../models/task')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    // !old solution before integrating auth
    // const task = new Task(req.body)
    // ? new solution
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        const tasks = await task.save()
        res.status(200).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

// GET /tasks?completed=false
// GET /tasks?limit=10%skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // ? solution 1
        // const task = await Task.find({owner: req.user._id})
        // res.send(task)
        // ? soultion 2
        const user = req.user
        await user.populate({
            path: 'tasks',
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        }).execPopulate()
        res.send(user.tasks)

    } catch (e) {
        res.status(500).send(e)
    }
    
    // ! promise chaining solution
    // Task.find({}).then((result) => {
    //     res.send(result)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const tasks = await Task.findById({_id})
        const tasks = await Task.findOne({ _id, owner: req.user._id})

        if (!tasks) {
            return res.status(404).send()
        }

        res.status(200).send(tasks)

    } catch (e) {
        res.status(500).send(e)
    }


    // Task.findById({_id}).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const isValid = ['description', 'completed']
    const validationOperation = updates.every((keys) => isValid.includes(keys))

    if (!validationOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    try {
        const tasks = await Task.findOne({_id, owner: req.user._id})
        
        // const tasks = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

        if (!tasks) {
            return res.send(404).send()
        }

        updates.forEach((updates) => tasks[updates] = req.body[updates])
        await tasks.save()

        res.send(tasks)

    } catch (e) {
        res.status(400).send(e)
    }


})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
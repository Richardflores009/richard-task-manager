const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
// when listen was in this file
//* const port = process.env.PORT 

// * Automatically parse requests as an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//? 
//?  Without middleware: new request -> run route handler
//? 
//? With middleware:     new request -> do something -> run route handler
//?  

module.exports = app


// ! adding support for files and suppoort for multer
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a word document'))
//         }

//         cb(undefined, true)
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From  my middleware')
// }
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })







// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {

//     // const task = await Task.findById('60343f3e5520ac31daf7d5e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('60343e7162ae42319f83a2e9')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))



// !json web token practice
// var jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     //  create web token 
//     const token = jwt.sign({ _id: 'abc123' }, 'anyseriesofcharacterswillwork', { expiresIn: '7 days' })
//     console.log(token)

//     // checks whether the user is authenticated correctly
//     const data = jwt.verify(token, 'anyseriesofcharacterswillwork')

//     console.log(data)
// }

// myFunction()


//! bcrypt practice
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()
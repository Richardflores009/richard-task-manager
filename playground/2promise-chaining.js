require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('602c5008a9739e11607359d2').then((task) => {
//     console.log(task)

//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const deleteTaskAndCount = async (id, task) => {
    // const tasks = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments( task )
    return count
}

deleteTaskAndCount('602c710662839a12dba4eaf1', {completed: false}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
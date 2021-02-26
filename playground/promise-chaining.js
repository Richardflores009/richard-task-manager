require('../src/db/mongoose')
const User = require('../src/models/user')

// 602c5eab2e4e8712157e97ca

User.findByIdAndUpdate('602c5eab2e4e8712157e97ca', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('602c5eab2e4e8712157e97ca', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        // ? look for header that user is supposed to provide
        const token = req.header('Authorization').replace('Bearer ','')
        // ? validates header
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // ? finds assotiated user
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch(e) {
        res.status(401).send({ error: 'Please Authenticate'})
    }
}


module.exports = auth

















// ! practice
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('Get requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if (req.method) {
//         return res.status(503).send('Website under maintenance')
//     }

//     next()
// })



const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String}

})

const Users = mongoose.model('user', userSchema)

module.exports = Users
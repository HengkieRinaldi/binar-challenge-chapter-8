const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    username : { type : String, required: true},
    password : { type : String, required: true},
    email : { type : String, required: true},
    type : {type : String}
})

const user = mongoose.model('user', schema)

module.exports = user
const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    user_id : { type : String, required: true},
    username : {type : String},
    fullName : { type : String},
    firstName : { type : String},
    lastName : { type : String},
    umur : { type : Number},
    tglLahir : { type : String},
    gender : { type : String},
    address : { type : String}
})

const profile = mongoose.model('profile', schema)

module.exports = profile
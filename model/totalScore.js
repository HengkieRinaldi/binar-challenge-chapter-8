const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    user_id : { type : String, required: true},
    win : { type : Number},
    draw : { type : Number},
    lose : { type : Number},
    waktu : {type : Date}
})

const totalScore = mongoose.model('totalScore', schema)

module.exports = totalScore
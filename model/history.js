const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    user_id : { type : String, required: true},
    win : { type : Number},
    draw : { type : Number},
    lose : { type : Number},
    waktu : {type : Date}
})

const history = mongoose.model('history', schema)

module.exports = history
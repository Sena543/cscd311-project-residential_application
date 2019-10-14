const mongoose = require('mongoose')

let registered_students_Schema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    id:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    hall:{
        type:String,
        default:'N/A'
    },
    room:{
        type:String,
        default:'N/A'
    },
    date_registered:{
        type: Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Registered Students', registered_students_Schema)
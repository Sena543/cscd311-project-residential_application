const mongoose = require('mongoose');

const hallSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
       // maxlenght: 1
    },
    roomNumber: {
        type: String,
        required: true
    },
    roomMembers: {
        type: Array,
        ref:'Registered Students',
    },
    date_registered:{
        type: Date,
        default:Date.now()
    }
});


module.exports = mongoose.model('Hall', hallSchema);
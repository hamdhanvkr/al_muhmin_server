const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    mobile_no:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        null:true
    }
})

const Member = mongoose.model('member',memberSchema)

module.exports= Member;
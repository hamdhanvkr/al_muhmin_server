const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const memberSchema = new mongoose.Schema({
    sno: {
        type: Number,
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
    },
    chapter:{
        type:String,
        required:true
    },
    academic_year:{
        type:Number,
        required:false
    }
})

memberSchema.plugin(AutoIncrement, { inc_field: 'sno' });


const Member = mongoose.model('member',memberSchema)

module.exports= Member;
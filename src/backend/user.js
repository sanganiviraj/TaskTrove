const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const User = mongoose.model("User" , userschema);

module.exports = User
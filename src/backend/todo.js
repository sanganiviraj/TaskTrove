const mongoose = require("mongoose");

const Todoschema = new mongoose.Schema({
    title:{
        require:true,
        type:String
    },
    status:{
        type:String,
        enum:["pending" , "completed"],
        default:"pending"
    },
    category:{
        type:String,
        require:true
    },
    dueDate:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const Todo = mongoose.model("Todo" , Todoschema);

module.exports = Todo
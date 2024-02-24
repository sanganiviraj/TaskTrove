const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const moment = require("moment");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(cors());

app.use(bodyparser.urlencoded({extends:false}));
app.use(bodyparser.json());

const jwt = require("jsonwebtoken");

mongoose
    .connect("mongodb+srv://logicwave36:logicwave123@cluster0.nywmb7w.mongodb.net/")
    .then(() => {
        console.log("connection successful to mongodb");
    })
    .catch((e) => {
        console.log("error connection => " , e);
    })

app.listen(port , () => {
    console.log("server running on 3000 port");
})


const User = require("../backend/user");
const Todo = require("../backend/todo");

app.post("/register" , async (req,res) => {
    try{
        const {name,email,password} = req.body;

        const existinguser = await User.findOne({email});

        if(existinguser){
            console.log("Email is already used!")
        }

        const newuser = new User({
            name,
            email,
            password
        })

        await newuser.save();

        res.status(200).json({message : "Registration Successfull"});
    }catch(error){
        res.status(500).json({message: "Registration Failed"});
        console.log("Error => " , error);
    }
})


const generatesecretkey = ( ) => {
    const secretkey = crypto.randomBytes(32).toString("hex");
    
    return secretkey;
}

const secretkey = generatesecretkey()

app.post("/login" , async(req,res) =>{
    try{
        const {email,password} = req.body;

        const user  = await User.findOne({email});

        if(!user){
            return res.status(401).json({message:"Invalid Email"});
        }

        if( user.password !== password){
            return res.status(401).json({message:"Invalid Password"});
        }

        const token  = jwt.sign({userid: user._id},secretkey)

        res.status(200).json({token})

    }catch(error){
        res.status(500).json({message: "Login Failed"});
        console.log("Error => " , error);
    }
})

app.post("/todos/:userId",async(req,res) => {
    try{
        const userid = req.params.userId;
        const {title,category} = req.body;

        const newtodo = new Todo({
            title,
            category,
            dueDate: moment().format("YYYY-MM-DD")
        })

        await newtodo.save();

        const user = await User.findById(userid);
        if(!user){
            res.status(404).json({error:"User not found"})  
        }

        user?.todos.push(newtodo._id);

        await user.save();

        res.status(200).json({message:"todo add successful",todo : newtodo})
    } catch(error){
        res.status(200).json({message:"Todo Not Added"})
    }
})


app.get("/users/:userId/todos" , async (req,res) => {
    try{
        const userId = req.params.userId;

        const user = await User.findById(userId).populate("todos");
        if(!user){
            return res.status(404).json({ error : "user not found"});
        }

        res.status(200).json({todos: user.todos});

    }catch(e){
        res.status(200).json({error : "something went wrong"})
    }
});

app.patch("/todos/:todoId/complete" , async (req,res) => {
    try{
        const todoId = req.params.todoId;

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                status:"completed",
            },
            {
                new:true
            }
        );

        if(!updatedTodo){
            return res.status(404).json({error: "Todo not found "})
        }

        res.status(200).json({message:"todo mark as a completed" , todo : updatedTodo});
    }catch(e){
        res.status(500).json({ error :"Something went wrong"});
    }
})


app.get("/todos/completed/:date" , async(req , res) => {
    try{
        const date = req.params.date;

        const completedTodos = await Todo.find({
            status:"completed",
            createdAt:{
                $gte : new Date(`${date}T00:00:00.000Z`),
                $lt : new Date(`${date}T23:59:59.999Z`),
            },
        }).exec();

        res.status(200).json({completedTodos})
    }catch(e){
        res.status(500).json({message:"something went wrong"})
    }
})

app.get("/todos/count" , async(req,res) => {
    try{

        const totalcompletedtodo = await Todo.countDocuments({
            status:"completed",
        }).exec();

        const totalpendingtodo = await Todo.countDocuments({
            status:"pending"
        }).exec();

        res.status(200).json({totalcompletedtodo,totalpendingtodo})

    }catch(e){
        res.status(500).json({message:"something went wrong"})
    }
})
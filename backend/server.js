import express from "express"
import mongoose from "mongoose"



mongoose.connect("mongodb+srv://praveen:Reaction111@cluster0.c35enxr.mongodb.net/"); //connect to mongodb atlas database
//all the code below is just to see if the connection is working or not
const db=mongoose.connection;
db.on("open", ()=>{
    console.log(" MongoDB connection successful");
});
db.on("error", (err)=>{
    console.log("connection unsucessfull", err);
});

const app=new express();// initialize the Express app
//make a server
app.listen(5000, ()=>{
    console.log("server is running on port 5100");
});

app.use(express.json()); //to parse the incoming json
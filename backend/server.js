import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoute.js";
import channelRoutes from "./routes/channelRoute.js";
import videoRoutes from "./routes/videoRoute.js";
import commentRoutes from "./routes/commentRoute.js";




const PORT = process.env.PORT || 5000;
const MONGO_URI ="mongodb+srv://praveen:Reaction@cluster0.c35enxr.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI); //connect to mongodb database
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
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json()); //to parse the incoming json

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
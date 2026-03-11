import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // load env variables

const app = express();

app.use(cors());
app.use(express.json());

/* ======================
   MongoDB Connection
====================== */

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* ======================
   Schema
====================== */

const responseSchema = new mongoose.Schema({

  name:String,

  responses:Object,

  answerType:String,

  createdAt:{
    type:Date,
    default:Date.now
  }

});

const Response = mongoose.model("Response", responseSchema);

/* ======================
   API
====================== */

app.post("/api/submit", async(req,res)=>{

  try{

    const newResponse = new Response(req.body);

    await newResponse.save();

    res.json({
      message:"Responses saved successfully"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      message:"Server error"
    });

  }

});

/* ======================
   Server Start
====================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{

  console.log(`Server running on port ${PORT}`);

});
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

mongoose.connect(process.env.DATABASE,
{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}).then(()=>{
    console.log("Database Connected Successfully!!!");
}).catch((error)=>{
    console.error(error);
});

app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`);
})
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(
    `mongodb+srv://rijen:rijensayami00438@cluster0.dp2qi.mongodb.net/Freshnesecom?retryWrites=true&w=majority`, 
  );

const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
});

app.listen(port, ()=>{
    console.log(`Ecommerce app listening to port ${port}`)
})
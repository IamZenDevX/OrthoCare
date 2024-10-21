const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const indexfile = require("./router/index.js");
const ErrorHandler = require('./utils/default/globalErrorHandler.js');


const app = express();

//******** MIDDLEWARE *******/
app.use(cors());
app.use(express.json());


// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use("/", indexfile);  

const dbURI = `mongodb+srv://Vihang:LlN2reduqeSUv9z9@cluster0.0tq4xsw.mongodb.net/ortho_care?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
.connect(dbURI)
.then(() => {
  app.listen(3000);
  console.log("MongoDB connected...");
})
.catch((err) => console.log(err));
app.use(ErrorHandler)
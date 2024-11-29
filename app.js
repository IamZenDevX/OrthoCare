const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const indexfile = require("./router/index.js");
const ErrorHandler = require('./utils/default/globalErrorHandler.js');


const app = express();


app.use(cors());
app.use(express.json());


// Load environment variables from .env file
dotenv.config();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use("/", indexfile);  

const dbURI = `mongodb://localhost:27017/`;

mongoose
.connect(dbURI)
.then(() => {
  app.listen(3000);
  console.log("MongoDB connected...");
})
.catch((err) => console.log(err));
app.use(ErrorHandler)

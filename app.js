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

const dbURI = `mongodb+srv://name:password@cluster0.0tq4xsw.mongodb.net/bms?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
.connect(dbURI)
.then(() => {
  app.listen(3000);
  console.log("MongoDB connected...");
})
.catch((err) => console.log(err));
app.use(ErrorHandler)

const express = require('express');
const app = express();

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/user");


mongoose.connect(
  //   "mongodb://node-shop:" +
  //     process.env.MONGO_ATLAS_PW +
  //     "@node-rest-shop-shard-00-00-wovcj.mongodb.net:27017,node-rest-shop-shard-00-01-wovcj.mongodb.net:27017,node-rest-shop-shard-00-02-wovcj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin",

  "mongodb://Garima19:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.ooiv30b.mongodb.net/?retryWrites=true&w=majority",


 {
    useMongoClient: true,
 }
 
 );

 mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});




module.exports = app;
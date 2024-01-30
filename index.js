const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connect = require("./db/db-connect");
const routes = require("./routes");
const errorHandler = require("./middlewares/error");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);
app.use(errorHandler);

const start = async () => {
  await connect();

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
  });
};

start();

const express = require("express"); // import express
const db = require("./config/connection"); // import the connection to the database
const routes = require("./routes"); // import the routes

const cwd = process.cwd(); // get the current working directory

const PORT = process.env.port || 3001; // set the port to either the environment variable or 3001
const app = express(); // instantiate the server as app

app.use(express.urlencoded({ extended: true })); // parse incoming JSON data
app.use(express.json()); // parse incoming JSON data
app.use(routes); // use the routes in the routes directory

db.once("open", () => {
  // start the server after the database connection is established
  app.listen(PORT, () => {
    // listen for requests
    console.log(`API server running on port ${PORT}!`); // log the port the server is running on
  });
});

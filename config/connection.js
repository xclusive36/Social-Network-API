const { connect, connection } = require('mongoose'); // Import the mongoose module

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialAPIDB'; // Replace with your Atlas connection string

connect(connectionString, { // Connect to the database
  useNewUrlParser: true, // useNewUrlParser is a configuration option that Mongoose uses to parse MongoDB connection strings
  useUnifiedTopology: true, // useUnifiedTopology is a configuration option that Mongoose uses to use the MongoDB driver's new connection management engine
});

module.exports = connection; // Export the active connection

const { Schema, model } = require("mongoose"); // import the Mongoose Schema and model constructors
const thoughtSchema = require("./Thought"); // import the Thought schema from Thought.js

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      // username field is a String and is required. It must be unique, and it must be trimmed.
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      // email field is a String, must match the Mongoose email regex, and is required. It must also be unique.
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [thoughtSchema], // thoughts field is an array of nested documents created with the thoughtSchema
    friends: [], // friends field is an array of _id values referencing the User model (self-reference)
  },
  {
    toJSON: {
      // use Mongoose's built-in toJSON function to transform the data before it's returned to the user
      getters: true, // enable getters
    },
  }
);

// Add userSchema to friends array
userSchema.add({
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }], // friends field is an array of _id values referencing the User model (self-reference)
});

// Virtual to count friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length; // return the length of the user's friends array field
});

const User = model("user", userSchema); // create the User model using the userSchema

module.exports = User; // export the User model

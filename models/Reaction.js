const { Schema, Types } = require("mongoose"); // import the Mongoose Schema and Types constructors from Mongoose

const reactionSchema = new Schema( // create the Reaction schema
  {
    reactionId: {
      // set custom id to avoid confusion with parent comment's _id field
      type: Schema.Types.ObjectId, // use Mongoose's ObjectId data type
      default: () => new Types.ObjectId(), // default value is set to a new ObjectId
    },
    reactionBody: {
      // reactionBody field is a String and is required with a max length of 280 characters
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      // username field is a String and is required
      type: String,
      required: true,
    },
    createdAt: {
      // createdAt field is a Date and defaults to the current timestamp. Use a getter method to format the timestamp on query.
      type: Date,
      default: Date.now,
      get: (createdAtVal) => {
        // Format date as MM/DD/YYYY
        return createdAtVal.toLocaleDateString();
      },
    },
  },
  {
    toJSON: {
      // use Mongoose's built-in toJSON function to transform the data before it's returned to the user
      getters: true, // enable getters
    },
    id: false, // set id to false because this is a virtual that Mongoose returns, and we don't need it
  }
);

module.exports = reactionSchema; // export the Reaction schema

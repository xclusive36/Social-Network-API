const { Schema, Types } = require("mongoose"); // import the Mongoose Schema and Types modules
const reactionSchema = require("./Reaction"); // import the Reaction schema from Reaction.js

const thoughtSchema = new Schema( // create the Thought schema
  {
    thoughtId: {
      // set custom id to avoid confusion with parent comment's _id field
      type: Schema.Types.ObjectId, // use Mongoose's ObjectId data type
      default: () => new Types.ObjectId(), // default value is set to a new ObjectId
    },
    thoughtText: {
      // thoughtText field is a String and is required with a max length of 280 characters
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
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
    username: {
      // username field is a String and is required
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // reactions field is an array of nested documents created with the reactionSchema
  },
  {
    toJSON: {
      // use Mongoose's built-in toJSON function to transform the data before it's returned to the user
      getters: true, // enable getters
    },
    id: false, // set id to false because this is a virtual that Mongoose returns, and we don't need it
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  // get total count of reactions on retrieval (virtual)
  return this.reactions.length; // return the length of the thought's reactions array field
});

module.exports = thoughtSchema; // export the Thought schema

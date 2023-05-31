const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [thoughtSchema],
    friends: [],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Add userSchema to friends array
userSchema.add({
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

// Virtual to count friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;

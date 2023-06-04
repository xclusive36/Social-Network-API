const { ObjectId } = require("mongoose").Types; // Import the ObjectId method from Mongoose
const { User } = require("../models"); // Import the User model

const userCount = async () =>
  // Function to count the number of users
  User.aggregate() // Use the aggregate method to count the number of users
    .count("numberOfUsers") // Count the number of users
    .then((numberOfUsers) => numberOfUsers.length); // Return the number of users

module.exports = {
  // USERS _________________________________________________________________
  // Get all users
  getUsers(req, res) {
    User.find() // Find all users
      .then(async (users) => {
        // Then asynchronously run the following code on the users
        const userObj = {
          // Create a user object with the following properties
          users, // The users array
          userCount: await userCount(), // The number of users
        };
        return res.json(userObj); // Return the user object
      })
      .catch((err) => {
        // If there is an error, return a 500 error
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }) // Find a user with the specified ID
      .select("-__v") // Don't return the __v field
      .lean() // Return a plain JS object instead of a Mongoose object
      .then(
        async (
          user // Then asynchronously run the following code on the user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user with that ID" })
            : res.json({ user }) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body) // Create a user with the specified data
      .then((user) => res.json(user)) // Then return the user
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      { _id: req.params.userId }, // Find a user with the specified ID
      { $set: req.body }, // Update the user with the specified data
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then(
        (
          user // Then return the updated user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId }) // Find a user with the specified ID and delete it
      .then((user) => res.json({ message: "User successfully deleted" })) // Then return a success message
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // THOUGHTS _________________________________________________________________
  // Add a thought to a user
  addThought(req, res) {
    // Add a thought to a user
    console.log("You are adding an thought"); // Log that you are adding a thought
    console.log(req.body); // Log the thought data
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      { _id: req.params.userId }, // Find a user with the specified ID
      { $addToSet: { thoughts: req.body } }, // Add the thought to the user
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then(
        (
          user // Then return the updated user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // Remove a thought from a user
  removeThought(req, res) {
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      { _id: req.params.userId }, // Find a user with the specified ID
      { $pull: { thought: { thoughtId: req.params.thoughtId } } }, // Remove the thought from the user
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then(
        (
          user // Then return the updated user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // Get a single thought
  getSingleThought(req, res) {
    User.findOne(
      // Find a user with the specified ID
      { _id: req.params.userId }, // Find a user with the specified ID
      { thoughts: { $elemMatch: { _id: req.params.thoughtId } } } // Find a thought with the specified ID
    )
      .select("-__v") // Don't return the __v field
      .lean() // Return a plain JS object instead of a Mongoose object
      .then(
        async (
          user // Then asynchronously run the following code on the user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user with that ID" }) // Otherwise, return the user
            : res.json({ user }) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // Update a thought
  updateThought(req, res) {
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      { _id: req.params.userId, "thoughts._id": req.params.thoughtId }, // Find a user with the specified ID and a thought with the specified ID
      { $set: { "thoughts.$.thoughtText": req.body.thoughtText } }, // Update the thought with the specified data
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then(
        (
          user // Then return the updated user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // REACTIONS _________________________________________________________________
  // Add a reaction to a thought
  addReaction(req, res) {
    console.log("You are adding an reaction"); // Log that you are adding a reaction
    console.log(req.body); // Log the reaction data
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      { _id: req.params.userId, "thoughts._id": req.params.thoughtId }, // Find a user with the specified ID and a thought with the specified ID
      { $addToSet: { "thoughts.$.reactions": req.body } }, // Add the reaction to the thought
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then((user) => {
        // Then return the updated user
        !user // If there is no user with that ID, return a 404 error
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user); // Otherwise, return the user
      })
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // Remove a reaction from a thought
  removeReaction(req, res) {
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      {
        _id: req.params.userId, // Find a user with the specified ID
        "thoughts._id": req.params.thoughtId, // Find a thought with the specified ID
        "thoughts.reactions._id": req.params.reactionId, // Find a reaction with the specified ID
      },
      { $pull: { "thoughts.$.reactions": { _id: req.params.reactionId } } }, // Remove the reaction from the thought
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then(
        (
          user // Then return the updated user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // FRIENDS _________________________________________________________________
  // Add a friend to a user
  addFriend(req, res) {
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      { _id: req.params.userId }, // Find a user with the specified ID
      { $addToSet: { friends: req.body } }, // Add the friend to the user
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then(
        (
          user // Then return the updated user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
  // Remove a friend from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      // Find a user with the specified ID and update it
      { _id: req.params.userId }, // Find a user with the specified ID
      { $pull: { friends: req.params.friendId } }, // Remove the friend from the user
      { runValidators: true, new: true } // Run validators and return the updated user
    )
      .then(
        (
          user // Then return the updated user
        ) =>
          !user // If there is no user with that ID, return a 404 error
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(user) // Otherwise, return the user
      )
      .catch((err) => res.status(500).json(err)); // If there is an error, return a 500 error
  },
};

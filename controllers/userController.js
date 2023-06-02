// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

// TODO: Create an aggregate function to get the number of users overall
const userCount = async () =>
  User.aggregate()
    // Your code here
    .count("numberOfUsers")
    .then((numberOfUsers) => numberOfUsers.length);

module.exports = {
  // USERS _________________________________________________________________
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => res.json({ message: "User successfully deleted" }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // THOUGHTS _________________________________________________________________
  // Add a thought to a user
  addThought(req, res) {
    console.log("You are adding an thought");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a thought from a user
  removeThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thought: { thoughtId: req.params.thoughtId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    User.findOne(
      { _id: req.params.userId },
      { thoughts: { $elemMatch: { _id: req.params.thoughtId } } }
    )
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a thought
  updateThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId, "thoughts._id": req.params.thoughtId },
      { $set: { "thoughts.$.thoughtText": req.body.thoughtText } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // REACTIONS _________________________________________________________________
  // Add a reaction to a thought
  addReaction(req, res) {
    console.log("You are adding an reaction");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId, "thoughts._id": req.params.thoughtId },
      { $addToSet: { "thoughts.$.reactions": req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>{
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)}
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a reaction from a thought
  removeReaction(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId, "thoughts._id": req.params.thoughtId, "thoughts.reactions._id": req.params.reactionId },
      { $pull: { "thoughts.$.reactions": { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // FRIENDS _________________________________________________________________
  // Add a friend to a user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : User.findOneAndUpdate(
              { _id: req.params.friendId },
              { $addToSet: { friends: req.params.userId } },
              { runValidators: true, new: true }
            )
              .then((friend) =>
                !friend
                  ? res
                      .status(404)
                      .json({ message: "No friend found with that ID :(" })
                  : res.json(friend)
              )
              .catch((err) => res.status(500).json(err))
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a friend from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : User.findOneAndUpdate(
              { _id: req.params.friendId },
              { $pull: { friends: req.params.userId } },
              { runValidators: true, new: true }
            )
              .then((friend) =>
                !friend
                  ? res
                      .status(404)
                      .json({ message: "No friend found with that ID :(" })
                  : res.json(friend)
              )
              .catch((err) => res.status(500).json(err))
      )
      .catch((err) => res.status(500).json(err));
  },
};

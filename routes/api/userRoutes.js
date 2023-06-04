const router = require("express").Router(); // import the Express router
const {
  // import the methods from userController.js
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addThought,
  updateThought,
  removeThought,
  getSingleThought,
  addReaction,
  removeReaction,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/", (req, res) => {
  // GET route to ensure the server is working
  res.send("Hello World!"); // send a message to the client
});

router.route("/").get(getUsers).post(createUser); // GET and POST at /api/users
router.route("/:userId").get(getSingleUser).put(updateUser); // GET one, PUT at /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser); // GET one, DELETE at /api/users/:userId
router.route("/:userId/thoughts").post(addThought); // POST at /api/users/:userId/thoughts
router.route("/:userId/thoughts/:thoughtId").get(getSingleThought); // GET one at /api/users/:userId/thoughts/:thoughtId
router
  .route("/:userId/thoughts/:thoughtId")
  .get(getSingleThought)
  .put(updateThought); // GET one, PUT at /api/users/:userId/thoughts/:thoughtId
router.route("/:userId/thoughts/:thoughtId").delete(removeThought); // DELETE at /api/users/:userId/thoughts/:thoughtId
router.route("/:userId/thoughts/:thoughtId/reactions").post(addReaction); // POST at /api/users/:userId/thoughts/:thoughtId/reactions
router
  .route("/:userId/thoughts/:thoughtId/reactions/:reactionId")
  .delete(removeReaction); // DELETE at /api/users/:userId/thoughts/:thoughtId/reactions/:reactionId
router.route("/:userId/friends").post(addFriend); // POST at /api/users/:userId/friends
router.route("/:userId/friends/:friendId").delete(removeFriend); // DELETE at /api/users/:userId/friends/:friendId

module.exports = router; // export the router

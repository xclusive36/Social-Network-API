const router = require('express').Router();
const {
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

} = require('../../controllers/userController');

router.route('/', (req, res) => {
  res.send('Hello World!');
});

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

// /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').get(getSingleThought);

// /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').get(getSingleThought).put(updateThought);

// /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

// /api/users/:userId/thoughts/:thoughtId/reactions
router.route('/:userId/thoughts/:thoughtId/reactions').post(addReaction);

// /api/users/:userId/thoughts/:thoughtId/reactions/:reactionId
router.route('/:userId/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;

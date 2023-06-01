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

module.exports = router;

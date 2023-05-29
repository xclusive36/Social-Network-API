const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

// /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

// /api/users/:userId/thoughts/:thoughtId/reactions
router.route('/:userId/thoughts/:thoughtId/reactions').post(addReaction);

// /api/users/:userId/thoughts/:thoughtId/reactions/:reactionId
router.route('/:userId/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

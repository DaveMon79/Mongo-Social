const router = require('express').Router();

// Importing thought controller functions
const { createThought, getAllThoughts, getThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thought-controller');

// Gets all users and creates a new user
router.route('/')
    .get(getAllThoughts)

router.route('/:thoughtId')
    .get(getThought)
    .delete(deleteThought)
    .put(updateThought)

// gets a single user, updates and deletes a user by id
router.route('/create/:userId')
    .post(createThought)

// Create and delete a reaction route
router.route('/reaction/:thoughtId')
    .post(createReaction)
    .delete(deleteReaction)




module.exports = router;
const router = require('express').Router();

const { createThought, getAllThoughts, getThought, updateThought } = require('../../controllers/thought-controller');

// Gets all users and creates a new user
router.route('/')
    .get(getAllThoughts)

router.route('/:thoughtId')
    .get(getThought)
    .delete()
    .put(updateThought)


// gets a single user, updates and deletes a user by id
router.route('/create/:userId')
    .post(createThought)
  


module.exports = router;
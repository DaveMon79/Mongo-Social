const router = require('express').Router();

const { createThought } = require('../../controllers/thought-controller');

// Gets all users and creates a new user
router.route('/')
    .get()
    .post(createThought)

// gets a single user, updates and deletes a user by id
router.route('/:userId')
    .get()
    .delete()
    .put()
    .post(createThought)


module.exports = router;
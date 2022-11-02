const router = require('express').Router();
const { getUsers, getSingleUser, createUser, deleteUser, updateUser } = require('../../controllers/user-controller');

// Gets all users and creates a new user
router.route('/')
    .get(getUsers)
    .post(createUser)

// gets a single user, updates and deletes a user by id
router.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)



module.exports = router;



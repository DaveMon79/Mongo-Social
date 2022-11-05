const router = require('express').Router();
// requiring user api functions
const { getUsers, getSingleUser, createUser, deleteUser, updateUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

// Gets all users and creates a new user
router.route('/')
    .get(getUsers)
    .post(createUser)

// gets a single user, updates and deletes a user by id
router.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)

    // routes to add & delete a friend
    router.route('/friends/:userId')
    .post(addFriend)
    .delete(deleteFriend)



module.exports = router;



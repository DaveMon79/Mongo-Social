const { Thought, User } = require('../models');

module.exports = {

    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a user 
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thought } })
            )
            .then(() => res.json({ message: 'User and associated apps deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.body.userId } },
            { new: true })
            .populate({ path: 'friends', select: '-__v' })
            .then((friendData) =>
                !friendData
                    ? res.status(404).json({
                        message: 'No user found with that ID',
                    })
                    : res.json('Friend added 🎉', friendData)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { ObjectId: req.body.userId } } },
            { new: true }
        )
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({ message: 'No user found with that ID!' });
                    return;
                }
                res.json(friendData);
            })
            .catch(err => res.json(err));
    },

};




const { Thought, User } = require('../models');

module.exports = {

    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((res) => res.json(res))
            .catch((err) => res.status(500).json(err));

    },


    // Gets a single thought by ID
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


    // Updates a thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },



    // Create a though and push thought ID to thoughts array in UserShema
    createThought(req, res) {
        Thought.create(req.body)

            .then((response) => {
                console.log("----------------")
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { thoughts: response._id } },
                    { new: true }
                );
            })

            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Thought created 🎉')
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    }



}

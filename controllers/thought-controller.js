// Importing User & thought models
const { Thought, User } = require('../models');

// exporting api functions
module.exports = {

    // Creates a reaction to a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((reactionData) =>
                !reactionData
                    ? res.status(404).json({
                        message: 'Reaction created, but no thought found with that ID',
                    })
                    : res.json(['Created reaction 🎉', reactionData])
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Deletes a thought by ID
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true }
        )
        .select('-__v')
            .then(reactionData => {
                if (!reactionData) {
                    res.status(404).json({ message: 'No reaction with that ID!' });
                    return;
                }
                res.json(['Deleted reaction 🎉', reactionData]);
            })
            .catch(err => res.json(err));
    },


    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));

    },


    // Gets a single thought by ID
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts),
            )

            .catch((err) => res.status(500).json(err));
    },


    // Updates a thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true })
            .select('-__v')
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughts)
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Delete a thought from thought and user db
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .select('-__v')
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thoughts with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((userData) =>
                !userData
                    ? res.status(404).json({
                        message: 'Thought deleted but no user with this id!',
                    })
                    : res.json({ message: 'Thought successfully deleted! 🎉', userData })
            )
            .catch((err) => res.status(500).json(err));
    },



    // Creates a though and pushes thought ID to thoughts array in UserShema
    createThought(req, res) {
        Thought.create(req.body)
            .then((response) => {
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
                    : res.json(['Thought created 🎉', user])
            )
            .catch((err) => {
                res.status(500).json(err);
            })
    }

}



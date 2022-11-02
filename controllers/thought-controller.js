const { Thought, User } = require('../models');

module.exports = {

    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((res) => res.json(res))
            // console.log(res)
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
            { runValidators: true, new: true }
        )
            .then((thoughts) =>
            // console.log(response),
                !thoughts
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughts)
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then(thoughtData => {
            if (!thoughtData) {
              res.status(404).json({ message: 'No thoughts found with that id!' });
              return;
            }
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $pull: { thoughts: params.Id } },
              { new: true }
            )
          })
          .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            console.log(userData)
            res.json('Thought deleted 🎉');
          })
          .catch(err => res.json(err));
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

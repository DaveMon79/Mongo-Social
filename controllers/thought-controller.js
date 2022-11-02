const { Thought, User } = require('../models');

module.exports = {

    createThought(req, res) {
        Thought.create(req.body)
          .then((thoughts) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughts._id } },
                { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the Thought 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

}


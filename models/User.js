// Importing mongoose
const { Schema, model, Types } = require('mongoose');

// User schema
const userSchema = new Schema(
  {
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^([a-z\d_\.-]+)@([\da-z\.-]+).([a-z\.]{2,6})$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// User model which is exported 
const User = model('User', userSchema);

module.exports = User;
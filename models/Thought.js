// Importing mongoose and moment for tome stamps
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Reaction schema 
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateCreated => moment(dateCreated).format('MMM DD, YYYY hh:mm a')
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Toughtschema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateCreated => moment(dateCreated).format('MMM DD, YYYY hh:mm a')

        },
        username: {
            type: String,
            required: true
        },

        reactions: [ReactionSchema]
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Thought model which is exported 
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
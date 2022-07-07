const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String
    },
    email: {
        type: String
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
            getters: true
        },
        id: false
    }
);

// get total count of friends for a user based  and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, friend) => total + friend.replies.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
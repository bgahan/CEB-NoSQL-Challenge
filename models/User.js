const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true,
        match: [/.+@.+\..+/, 'Please make sure email is valid']
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
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;
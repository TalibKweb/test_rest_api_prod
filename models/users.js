let mongoose = require('mongoose');
let { userDB } = require('../db/db');

let userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

module.exports = userDB.model('User', userSchema);
// 👈 The third parameter in mongoose.model() tells Mongoose to use all_users as the collection name exactly as it is.
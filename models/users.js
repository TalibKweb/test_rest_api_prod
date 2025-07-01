let mongoose = require('mongoose');

// "id": 10,
// "name": "Jason",
// "slug": "jason",
// "gender": "Agender"

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

module.exports = mongoose.model('User', userSchema);
// 👈 The third parameter in mongoose.model() tells Mongoose to use all_users as the collection name exactly as it is.


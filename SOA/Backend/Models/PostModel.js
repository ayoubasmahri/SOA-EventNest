const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.promise = Promise;

const postSchema = new schema({
    title: { type: String, unique: false },
    description: { type: String, unique: false },
    price_per_hour: { type: Number, unique: false },
    location: { type: String, unique: false },
    owner: { type: String, unique: false },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    size: { type: String, unique: false },
    capacity: { type: Number, unique: false },
    photo1: [{ type: String }],
    photo2: [{ type: String }],
    services: [{
        name: { type: String, unique: false },
        price: { type: Number, unique: false }
    }],
    reservations:[ { type: mongoose.Schema.Types.ObjectId, ref: 'reservation' }],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

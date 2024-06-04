const mongoose = require('mongoose')
const {Schema} = mongoose
mongoose.promise = Promise

const userSchema = new Schema({
    name : {type: String, unique: false ,required: true},
    email: {type: String,unique: true, required: true},
    password: {type: String, unique: false ,required: true},
    posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    reservations:[ { type: mongoose.Schema.Types.ObjectId, ref: 'reservation' }],
},)
const user = mongoose.model('User', userSchema)
module.exports = user
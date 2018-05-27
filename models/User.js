const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    googleDisplayName: { type: String, default: '' },
    googlePhoto: { type: String, default: '' },
    point: { type: Number, default: 0 },
    sessionPoint: { type: Number, default: 0 },
    isPlay: { type: Boolean, default: false }
}, { versionKey: false });

mongoose.model('users', userSchema);
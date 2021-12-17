import mongoose from 'mongoose'

const User = mongoose.model('Log', new mongoose.Schema({
    user_id: { type: Number, required: true },
    username: { type: String },
    name: { type: String },
    chat_id: { type: Number, required: true },
    action: { type: String, required: true },
    message: { type: String }
}));

export default User;
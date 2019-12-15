const mongoose = require('./db')
const {Schema} = mongoose

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: {type: String, required: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    avatar: {type: String, default: 'https://imgslim.geekpark.net/image/newgeekpark/qr_app.gif'},
    role: {type: String, default: 'ghost', enum: ['ghost', 'editor', 'admin'],},
    is_limited: {type: Boolean, default: true},
    third: {type: Boolean, default: null},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

const UserModel = mongoose.model('user', UserSchema, 'user')

module.exports = UserModel

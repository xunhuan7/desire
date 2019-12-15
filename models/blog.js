const mongoose = require('./db')
const {Schema} = mongoose

const BlogSchema = new Schema({
    _id: Schema.Types.ObjectId,
    head_photo: {type: String, required: false},
    title: {type: String, required: true},
    summary: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: 'user', required: true,},
    content: {type: String, default: ''},
    tags: {type: Array, default: []},
    weight: {type: Number, default: 1, enum: [1, 2, 3, 4, 5]},
    stick: {type: Boolean, default: false},
    views: {type: Number, default: 0},
    status: {type: String, default: 'draft', enum: ['draft', 'published', 'deleted']},
    likes: {type: Number, default: 0},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

const BlogModel = mongoose.model('blog', BlogSchema, 'blog')

module.exports = BlogModel

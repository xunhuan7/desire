const mongoose = require('./db')
const {Schema} = mongoose

const BlogSchema = new Schema({
    head_photo: {
        type: String,
        required: true,
        default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    },
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

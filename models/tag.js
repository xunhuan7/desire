const mongoose = require('./db')
const {Schema} = mongoose

const TagSchema = new Schema({
    tag: {type: String},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

const TagModel = mongoose.model('tag', TagSchema, 'tag')

module.exports = TagModel

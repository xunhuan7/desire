const BlogModel = require('../../models/blog')

async function getBlogById(ctx, next) {
    const {_id} = ctx.params
    const data = await BlogModel.findById(_id).populate('creator').exec()
    ctx.body = {
        code: 200,
        message: '查询成功',
        data
    }
}

module.exports = getBlogById

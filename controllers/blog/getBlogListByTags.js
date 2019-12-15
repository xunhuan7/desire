const BlogModel = require('../../models/blog')

async function getBlogList(ctx, next) {
    const query = {
        page: ctx.request.query.page && Number(ctx.request.query.page),
        page_size: ctx.request.query.page_size && Number(ctx.request.query.page_size),
        tags: ctx.request.query.tags
    }

    const {page = 1, page_size = 20} = query
    const tags = query.tags ? query.tags.split(',') : []

    const count = await BlogModel.countDocuments({tags: {$in: tags}})
    const list = await BlogModel.find({tags: {$in: tags}}).populate('creator')
        .skip((page - 1) * page_size)
        .limit(page_size).exec()
    const has_prev = page !== 1
    const has_next = page < Math.ceil(count / page_size)
    ctx.body = {
        code: 200,
        message: '查询成功',
        data: {
            count,
            page,
            page_size,
            has_prev,
            has_next,
            list,
        }
    }
}

module.exports = getBlogList

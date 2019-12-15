const BlogModel = require('../../models/blog')

async function getBlogList(ctx, next) {
    const pageInfo = {
        page: ctx.request.query.page && Number(ctx.request.query.page),
        page_size: ctx.request.query.page_size && Number(ctx.request.query.page_size),
    }

    const queryInfo = {
        weight: ctx.request.query.weight,
        stick: ctx.request.query.stick,
        status: ctx.request.query.status,
    }
    for (const key in queryInfo) {
        if (queryInfo[key] === undefined) {
            delete queryInfo[key]
        }
    }

    const {page = 1, page_size = 20,} = pageInfo
    const count = await BlogModel.estimatedDocumentCount({})
    const list = await BlogModel.find(queryInfo).populate('creator')
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

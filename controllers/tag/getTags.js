const TagModel = require('../../models/tag')

async function getTagList(ctx, next) {
    const count = await TagModel.estimatedDocumentCount({})
    const list = await TagModel.find({})
    ctx.body = {
        code: 200,
        message: '查询成功',
        data: {
            count,
            list,
        }
    }
}

module.exports = getTagList

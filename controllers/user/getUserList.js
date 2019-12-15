const UserModel = require('../../models/user')
const {isRole} = require('../../core/checkAuthority')

async function getUserList(ctx, next) {

    // 管理员鉴权
    if (!await isRole(ctx, 'admin')) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: '使用管理员账号执行此操作',
        }
        return true
    }

    const query = {
        page: ctx.request.query.page && Number(ctx.request.query.page),
        page_size: ctx.request.query.page_size && Number(ctx.request.query.page_size),
    }
    const {page = 1, page_size = 20} = query
    const count = await UserModel.estimatedDocumentCount({})
    const list = await UserModel.find({}, {password: 0})
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

module.exports = getUserList

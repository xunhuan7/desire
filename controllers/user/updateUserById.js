const UserModel = require('../../models/user')
const {isRole} = require('../../core/checkAuthority')

async function updateUserById(ctx, next) {

    // 仅管理员允许修改用户权限相关信息
    if (!await isRole(ctx, 'admin')) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: '使用管理员账号执行此操作',
        }
        return true
    }

    const {_id} = ctx.params
    const {role, is_limited} = ctx.request.body
    const params = {}
    if (['admin', 'editor', 'ghost'].indexOf(role) > -1) {
        params.role = role
    }
    if (typeof is_limited === 'boolean') {
        params.is_limited = is_limited
    }
    await UserModel.updateOne({_id}, params)
    ctx.body = {
        code: 200,
        message: '修改用户信息成功',
    }
}

module.exports = updateUserById

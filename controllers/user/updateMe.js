const UserModel = require('../../models/user')
const {getUserId, isRole} = require('../../core/checkAuthority')

async function updateMe(ctx, next) {

    // 非内部用户禁止修改个人信息
    if (await isRole(ctx, 'ghost')) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: 'Ghost用户仅拥有评论权限',
        }
        return true
    }

    const {nickname, avatar, password} = ctx.request.body
    const params = {}
    nickname && (params.nickname = nickname)
    avatar && (params.nickname = avatar)
    password && (params.nickname = password)
    await UserModel.updateOne({_id: getUserId(ctx)}, params)
    ctx.body = {
        code: 200,
        message: '更新个人信息成功',
        data: params
    }
}

module.exports = updateMe

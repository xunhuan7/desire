const UserModel = require('../../models/user')
const {getUserId} = require('../../core/checkAuthority')

async function getMe(ctx, next) {
    const _id = getUserId(ctx)
    const data = await UserModel.findById(_id, {password: 0}).exec()
    ctx.body = {
        code: 200,
        message: '查询成功',
        data
    }
}

module.exports = getMe

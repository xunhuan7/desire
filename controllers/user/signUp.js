const UserModel = require('../../models/user')

async function signUp(ctx, next) {
    const {email, password, nickname} = ctx.request.body
    const userEntity = new UserModel({
        email,
        password,
        nickname
    })

    // 检测邮箱是否已注册
    if (await UserModel.findOne({email})) {
        ctx.status = 500
        ctx.body = {
            code: 500,
            message: '账号已经注册'
        }
        return true
    }

    const {_id} = await userEntity.save()
    ctx.body = {
        code: 200,
        message: '注册成功',
        data: await UserModel.findById(_id, {password: 0})
    }
}

module.exports = signUp

const jwt = require('jsonwebtoken')
const {JSON_WEB_TOKEN} = require('../../config/environment')
const UserModel = require('../../models/user')

async function signIn(ctx, next) {
    const {email, password} = ctx.request.body

    // 数据验证
    if (!(email && password)) {
        ctx.status = 500
        ctx.body = {
            code: 500,
            message: '账号密码格式不正确',
        }
        return true
    }

    const user = await UserModel.findOne({email, password})

    // 登录失败处理
    if (!user) {
        ctx.status = 400
        ctx.body = {
            code: 400,
            message: '账号或密码错误',
        }
        return true
    }

    const {_id, role} = user
    const token = jwt.sign(
        {_id, role},
        JSON_WEB_TOKEN.PRIVATE_KEY,
        {expiresIn: JSON_WEB_TOKEN.EXPIRES_IN}
    )
    ctx.cookies.set('token', token)
    ctx.body = {
        code: 200,
        message: '登录成功'
    }
}

module.exports = signIn

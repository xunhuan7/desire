const BlogModel = require('../../models/blog')
const {getUserId, isRole, isLimited} = require('../../core/checkAuthority')

async function updateBlogStick(ctx, next) {
    const {_id} = ctx.params
    const {stick} = ctx.request.body

    // 非内部用户禁止创建博客文章
    if (!await isRole(ctx, 'admin')) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: '仅管理员有权进行文章置顶操作',
        }
        return true
    }

    // 参数验证
    if (typeof stick !== 'boolean') {
        ctx.status = 400
        ctx.body = {
            code: 400,
            message: '博客文章置顶项为布尔值',
        }
        return true
    }

    await BlogModel.updateOne({_id}, {stick})

    ctx.body = {
        code: 200,
        message: `修改博客文章置顶项成功`,
    }
}

module.exports = updateBlogStick

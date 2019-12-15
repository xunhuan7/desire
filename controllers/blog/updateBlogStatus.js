const BlogModel = require('../../models/blog')
const {getUserId, isRole, isLimited} = require('../../core/checkAuthority')

async function updateBlogStatus(ctx, next) {
    const {_id} = ctx.params
    const {status} = ctx.request.body

    // 非内部用户禁止创建博客文章
    if (await isRole(ctx, 'ghost')) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: 'Ghost用户仅拥有评论权限',
        }
        return true
    }

    // 普通用户只能修改自己创建的博客文章
    if (await isRole(ctx, 'editor') && (_id !== getUserId(ctx))) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: 'Editor用户仅无法修改非自己创建的博客文章状态',
        }
        return true
    }

    // 用户必需为非禁用
    if (await isLimited(ctx)) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: '用户处于被禁用状态',
        }
        return true
    }

    // 参数验证
    if (status !== 'draft' && status !== 'published' && status !== 'deleted') {
        ctx.status = 400
        ctx.body = {
            code: 400,
            message: '博客文章状态只能为draft，published，deleted中的一个',
        }
        return true
    }

    await BlogModel.updateOne({_id}, {status})

    ctx.body = {
        code: 200,
        message: `修改博客文章状态成功`,
    }
}

module.exports = updateBlogStatus

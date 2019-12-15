const BlogModel = require('../../models/blog')
const {getUserId, isRole, isLimited} = require('../../core/checkAuthority')

async function updateBlogById(ctx, next) {
    // TODO：更新history表
    const {_id} = ctx.params
    const {status} = ctx.request.body

    // 非内部用户禁止修改博客文章
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
    const params = {
        head_photo: ctx.request.body.head_photo,
        title: ctx.request.body.title,
        summary: ctx.request.body.summary,
        content: ctx.request.body.content,
        tags: ctx.request.body.tags,
        weight: ctx.request.body.weight,
        stick: ctx.request.body.stick,
    }
    for (const key in params) {
        const value = params[key]
        if (!value || (Array.isArray(value) && value.length === 0)) {
            ctx.status = 400
            ctx.body = {
                code: 400,
                message: '更新博客文章时head_photo,title,summary,content,tags,weight,stick均为必填字段',
            }
            return true
        }
    }

    await BlogModel.updateOne({_id}, params)

    ctx.body = {
        code: 200,
        message: `更新博客文章成功`,
    }
}

module.exports = updateBlogById

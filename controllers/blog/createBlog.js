const BlogModel = require('../../models/blog')
const {getUserId, isRole, isLimited} = require('../../core/checkAuthority')

async function createBlog(ctx, next) {

    // 非内部用户禁止创建博客文章
    if (await isRole(ctx, 'ghost')) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: 'Ghost用户仅拥有评论权限',
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

    const blogInstance = {
        creator: getUserId(ctx),
        title: ctx.request.body.title,
        summary: ctx.request.body.summary,
    }
    if (Array.isArray(ctx.request.body.tags)) {
        // TODO: redis更新tags以用于查询
        blogInstance.tags = ctx.request.body.tags
    }
    const blogEntity = new BlogModel(blogInstance)
    await blogEntity.save()
    ctx.body = {
        code: 200,
        message: '创建成功',
    }
}

module.exports = createBlog

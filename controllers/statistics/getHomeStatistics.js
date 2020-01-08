const UserModel = require('../../models/user')
const BlogModel = require('../../models/blog')
const TagModel = require('../../models/tag')

async function getHomeStatistics(ctx, next) {
    const totalUserCount = await UserModel.count()
    const totalEditorCount = await UserModel.count({role: {$ne: 'ghost'}})
    const totalDraftBlogCount = await BlogModel.count({status: 'draft'})
    const totalPublishedBlogCount = await BlogModel.count({status: 'published'})

    const tags = await TagModel.find()
    const tagsBlog = new Array()
    for (const item of tags) {
        const count = await BlogModel.count({tags: {$elemMatch: {$eq: item.tag}}, status: 'published'})
        tagsBlog.push({name: item.tag, value: count})
    }

    const members = await UserModel.find({role: {$ne: 'ghost'}});
    const membersBlog = {xAxis: [], series: []}
    for (const item of members) {
        const count = await BlogModel.count({creator: item._id, status: 'published'})
        membersBlog.xAxis.push(item.nickname)
        membersBlog.series.push(count)
    }
    ctx.body = {
        code: 200,
        message: '查询成功',
        data: {
            totalUserCount,
            totalEditorCount,
            totalDraftBlogCount,
            totalPublishedBlogCount,
            tagsBlog,
            membersBlog
        }
    }
}

module.exports = getHomeStatistics

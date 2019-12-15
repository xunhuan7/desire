const jwt = require('jsonwebtoken')
const {JSON_WEB_TOKEN} = require('../config/environment')
const UserModel = require('../models/user')

function getUserId(ctx) {
    const token = ctx.cookies.get('token')
    return jwt.verify(token, JSON_WEB_TOKEN.PRIVATE_KEY)._id
}

async function isRole(ctx, authority) {
    const token = ctx.cookies.get('token')
    const {_id} = jwt.verify(token, JSON_WEB_TOKEN.PRIVATE_KEY)
    const {role} = await UserModel.findOne({_id})
    return authority === role
}

async function isLimited(ctx) {
    const token = ctx.cookies.get('token')
    const _id = jwt.verify(token, JSON_WEB_TOKEN.PRIVATE_KEY)._id
    const {is_limited} = await UserModel.findOne({_id})
    return is_limited
}

module.exports = {
    getUserId,
    isRole,
    isLimited
}

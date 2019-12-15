const router = require('koa-router')()

const signUp = require('./controllers/user/signUp')
const signIn = require('./controllers/user/signIn')
const updateMe = require('./controllers/user/updateMe')
const getMe = require('./controllers/user/getMe')
const getUserList = require('./controllers/user/getUserList')
const updateUserById = require('./controllers/user/updateUserById')

const createBlog = require('./controllers/blog/createBlog')
const updateBlogStatus = require('./controllers/blog/updateBlogStatus')
const getBlogById = require('./controllers/blog/getBlogById')
const updateBlogById = require('./controllers/blog/updateBlogById')
const getBlogList = require('./controllers/blog/getBlogList')
const getBlogListByTags = require('./controllers/blog/getBlogListByTags')

router.get('/', (ctx, next) => {
    ctx.body = {
        status: 200,
        message: '测试正常'
    }
})

router
    .post('/user', signUp)
    .get('/user', getUserList)
    .post('/user/auth', signIn)
    .put('/user/me', updateMe)
    .get('/user/me', getMe)
    .put('/user/:_id', updateUserById)

router
    .post('/blog', createBlog)
    .get('/blog', getBlogList)
    .get('/blog_by_tags', getBlogListByTags)
    .get('/blog/:_id', getBlogById)
    .put('/blog/:_id', updateBlogById)
    .put('/blog/:_id/status', updateBlogStatus)

module.exports = router

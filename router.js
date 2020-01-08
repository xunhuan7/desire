const router = require('koa-router')()

const signUp = require('./controllers/user/signUp')
const signIn = require('./controllers/user/signIn')
const updateMe = require('./controllers/user/updateMe')
const getMe = require('./controllers/user/getMe')
const getUserList = require('./controllers/user/getUserList')
const updateUserById = require('./controllers/user/updateUserById')

const createBlog = require('./controllers/blog/createBlog')
const getBlogById = require('./controllers/blog/getBlogById')
const updateBlogById = require('./controllers/blog/updateBlogById')
const updateBlogStatus = require('./controllers/blog/updateBlogStatus')
const updateBlogStick = require('./controllers/blog/updateBlogStick')
const getBlogList = require('./controllers/blog/getBlogList')
const getBlogListByTags = require('./controllers/blog/getBlogListByTags')

const getTags = require('./controllers/tag/getTags')

const uploadFile = require('./controllers/file/uploadFile')

const getHomeStatistics = require('./controllers/statistics/getHomeStatistics')

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
    .put('/blog/:_id/stick', updateBlogStick)

router
    .get('/tags', getTags)

router
    .post('/file/upload', uploadFile)

router
    .get('/statistics/home', getHomeStatistics)

module.exports = router

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const url = require('url');
const mongoose = require('./models/db')
const loggerAsync = require('./middlewares/loggerAsync')

const app = new Koa()

app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
        multipart: true // 是否支持 multipart-formdate 的表单
    }
}));
app.use(loggerAsync)
app.use(bodyParser())

app.on('error', (err, ctx) => {
    console.log('发现异常：', err.message);
})

app.use(cors({
    origin: function (ctx) {
        const whiteList = ['http://192.168.31.51:8080', 'http://localhost:8080'];
        const {protocol, host} = url.parse(ctx.url);
        const requestUrl = protocol + '//' + host
        console.log(requestUrl)
        if (whiteList.includes(requestUrl)) {
            return requestUrl
        }
        return 'http://localhost:8080'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 20,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
        ctx.app.emit('error', err, ctx);
    }
})

// 配置静态资源加载中间件 apiDoc用
// app.use(koaStatic(
//     path.join(__dirname, './public')
// ))

// routes
app.use(require('./router').routes())

// 404
app.use(async (ctx) => {
    ctx.throw(404, 'Not Found');
})

app.listen(3000, () => {
    console.info('Listening on port 3000 ......')
})

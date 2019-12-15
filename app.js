const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const mongoose = require('./models/db')
const loggerAsync = require('./middlewares/loggerAsync')

const app = new Koa()

app.use(loggerAsync)
app.use(bodyParser())

app.on('error', (err, ctx) => {
    console.log('发现异常：', err.message);
})
app.use(async (ctx, next) => {
    try {
        await next();
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

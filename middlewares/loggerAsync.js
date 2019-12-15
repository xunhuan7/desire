const moment = require('moment')

function prevLogger(ctx) {
    const prevInfo = `${moment().format('YYYY/MM/DD hh:mm:ss')} 处理开始：${ctx.method} ${ctx.url}`
    console.info(prevInfo)
}

function nextLogger(ctx, time) {
    const nextInfo = `${moment().format('YYYY/MM/DD hh:mm:ss')} 处理结束：${ctx.method} ${ctx.url} 耗时：${time} ms`
    console.info(nextInfo)
}

module.exports = async function (ctx, next) {
    const start = new Date();
    prevLogger(ctx)
    await next();
    const time = new Date() - start;
    nextLogger(ctx, time);
}

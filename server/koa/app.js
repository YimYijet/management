const koa = require('koa')

const app = new koa()

const main = ctx => {
    ctx.response.body = 'Hello nginx'
}

app.use(main)

app.listen(3344)
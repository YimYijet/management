import koa from 'koa'

const app = new koa()

const main = ctx => {
    cts.response.body = 'Hello nginx'
}

app.use(main)

app.listen(3344)
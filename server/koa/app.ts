import * as http from 'http'
import * as koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as compose from 'koa-compose'
import * as jwt from 'koa-jwt'
import * as logger from 'koa-logger'
import * as session from 'koa-session'
import * as serve from 'koa-static'
import * as views from 'koa-views'
import * as path from 'path'
// import * as https from 'https'
import router from './app/routers'
import { connectDB, dbPath } from './config/db'
import * as env from './config/env'
import { MongoStore } from './config/store'
import * as middleware from './lib/middleware'
import * as util from './lib/util'

const app = new koa()

const secret = util.getSecret()

// cookie加密key
app.keys = [secret]
// jwt加密过滤
app.use(jwt({ secret }).unless({
    path: [/^\/(login|static)|^\/$/],
}))
// 请求，响应日志
app.use(logger())
// 静态路径
app.use(serve(path.join(__dirname, '../../..', 'client/react/dist')))
// 模板引擎
app.use(views(path.join(__dirname, '../../..', 'client/react/dist')))
// 持久化session
app.use(session({ store: new MongoStore({
    collection: 'sessions',
    db: dbPath.db,
    maxAge: 86400,
    options: {
        useNewUrlParser: true,
    },
    url: dbPath.url,
}) }, app))
// 请求数据解析
app.use(bodyParser())
// 自定义中间件
app.use(compose([middleware.intercept]))
// 链接数据库
console.log('connecting database')
connectDB().then(() => {
    console.log('database connected')
    // 路由加载
    app.use(router.routes())
    http.createServer(app.callback()).listen(env.httpPort, () => {
        console.log(`http server listening on port: ${env.httpPort}`)
    })
    // https.createServer({}, app.callback()).listen(env.httpsPort, () => {
    //     console.log(`https server listening on port: ${env.httpsPort}`)
    // })
})

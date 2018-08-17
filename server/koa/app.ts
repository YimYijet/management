import * as koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session'
import * as logger from 'koa-logger'
import * as compose from 'koa-compose'
import * as serve from 'koa-static'
import * as path from 'path'
import * as views from 'koa-views'
import * as jwt from 'koa-jwt'
import * as env from './config/env'
import * as util from './lib/util'
import router from './app/routers'
import * as middleware from './lib/middleware'
import { dbPath, MongoStore } from './config/db'

const app = new koa()

const secret = util.getSecret()

// cookie加密key
app.keys = [secret]
// jwt加密过滤
app.use(jwt({secret}).unless({
    path: [/^\/login|^\//]
}))
// 请求，响应日志
app.use(logger())
// 静态路径
app.use(serve(path.join(__dirname, './public')))
// 模板引擎
app.use(views(path.join(__dirname, '../../../client')))
// 持久化session
app.use(session({ store: new MongoStore({
    url: dbPath.url,
    db: dbPath.db,
    collection: 'sessions',
    maxAge: 86400,
    options: {
        useNewUrlParser: true
    }
}) }, app))
// 请求数据解析
app.use(bodyParser())
// 自定义中间件
// app.use(compose([middleware.intercept]))
// 路由加载
app.use(router.routes())

app.listen(env.port)
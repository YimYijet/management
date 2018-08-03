import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as logger from 'koa-logger';
import * as env from './config/env';
import router, { intercept } from './app/routers';
import { dbPath, MongoStore } from './config/db';

const app = new koa();
app.keys = ['hello'];
// 请求，响应日志
app.use(logger());
// 持久化session
app.use(session({ store: new MongoStore({
    url: dbPath.url,
    db: dbPath.db,
    collection: 'sessions',
    maxAge: 86400,
    options: {
        useNewUrlParser: true
    }
}) }, app));
// 请求数据解析
app.use(bodyParser());
// 路由加载
app.use(router.routes());
app.use(intercept.routes());

app.listen(env.port);
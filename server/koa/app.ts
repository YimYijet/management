import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as logger from 'koa-logger';
import router from './app/routers';
import * as env from './config/env';

const app = new koa();
app.keys = ['userId'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());
app.use(router.routes());

app.listen(env.port);
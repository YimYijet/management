import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as env from './config/env';
import router from './app/routers';

const app = new koa();
app.use(bodyParser());
app.use(router.routes());

app.listen(env.port);
import * as koa from 'koa';

import port from './config/environment';
import router from './app/routers';

const app = new koa();

app.use(router.routes());

app.listen(port);
import * as koa from 'koa';
import * as evn from './config/environment';
import router from './app/routers';
import { config } from './config/database';
import waterline from './app/models';

const app = new koa();

app.use(router.routes());

waterline.initialize(config, (err: any, models: any) => {
    if (err) {
        console.log('waterline initialize failed, err:', err);
        return;
    }
    waterline.models = models.collections;
    app.listen(evn.port);
});



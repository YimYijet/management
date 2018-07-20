export default (router: any): void => {

    router.get('/test2', (ctx: any) => {
        ctx.response.body = 'test2';
    });

    router.get('/test3', (ctx: any) => {
        ctx.response.body = 'test3';
    });
};
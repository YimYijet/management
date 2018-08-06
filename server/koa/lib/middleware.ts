import { Context } from 'koa'

export async function intercept(ctx: Context, next: Function) {
    if (ctx.session.curUserId || ctx.path == '/login' || ctx.path == '/') {
        return next()
    } else {
        ctx.redirect('/')
    }
}
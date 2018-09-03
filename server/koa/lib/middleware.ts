import { Context } from 'koa'

export async function intercept(ctx: Context, next: () => void) {
    // if (ctx.session.curUserId || ctx.path == '/login' || ctx.path == '/') {
    //     return next()
    // } else {
    //     ctx.redirect('/')
    // }
    console.log(ctx.state.user)
    return next()
}

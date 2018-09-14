import { Context } from 'koa'

export async function intercept(ctx: Context, next: () => void) {
    console.log(ctx.state.user)
    return next()
}

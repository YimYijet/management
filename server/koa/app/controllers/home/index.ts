import { Context } from 'koa'

class HomeController {
    public static async home(ctx: Context): Promise<void> {
        ctx.type = 'html'
        await ctx.render('index.html')
    }
}

export default HomeController

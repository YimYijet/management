import { Context } from 'koa'
import * as fs from 'fs'
import * as util from '../../../lib/util'

class HomeController {
    async home(ctx: Context): Promise<void> {
        ctx.type = 'html'
        await ctx.render('index.html')
        // ctx.body = fs.createReadStream('../../client/index.html')
    }
}

export default new HomeController()
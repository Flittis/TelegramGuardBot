import Config from './src/Config.js'

/* Modules */

import mongoose from 'mongoose'
import { Telegraf } from 'telegraf'

/* Controllers */

import BotController from './src/Controller/BotController.js'
import AdminMiddleware from './src/Middleware/AdminMiddleware.js'

/* Telegram Bot */

const bot = new Telegraf(Config.BOT_TOKEN)

bot.use(AdminMiddleware)

bot.on('message', BotController.Message)

bot.catch((error, ctx) => console.error(error, ctx))

/* Starter */

async function Start() {
    try {
        await mongoose.connect(`${Config.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log(`DB Connected to ${Config.DB_URL.replace(/(mongodb\:\/\/).+\@(.+)\/.+/gi, '$1$2')}`));

        bot.startPolling();

        console.log(`Bot started`)
    } catch (e) {
        console.error(e);
    }
}

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

Start();

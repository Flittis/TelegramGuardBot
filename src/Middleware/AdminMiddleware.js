import Config from '../Config.js'

let Admins = {
    lastCheck: 0,
    cache: null
}

let AdminMiddleware = async (msg, next) => {
    if (msg.from?.id == Config.BOT_ID) return;
    if (msg.chat?.id != Config.CHAT_ID && msg.chat.type != 'private') return;

    if (!Admins.cache || Date.now() - Admins.lastCheck > 600 * 10) {
        await msg.telegram.getChatAdministrators(Config.CHAT_ID)
            .then( data => Admins.cache = data.map(el => el.user.id) )

        Admins.lastCheck = Date.now();
    }

    msg.from.isAdmin = Admins.cache.includes(msg.from.id);
    msg.admins = Admins.cache;

    msg.tempReply = (body) => {
        return msg.telegram.sendMessage(msg.chat.id, body, { parse_mode: 'MarkdownV2' })
            .then(_msg => {
                setTimeout(() => msg.telegram.deleteMessage(msg.chat.id, _msg.message_id).catch(err => console.error(`Unable to delete ${_msg.message_id}`, err)), 3 * 1000)
            })
            .catch(err => console.error(`Unable to send message`, err))
    }

    next();
}

export default AdminMiddleware;

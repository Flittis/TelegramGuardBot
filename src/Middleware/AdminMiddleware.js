import Config from '../Config.js'

let Admins = {
    lastCheck: 0,
    cache: null
}

let AdminMiddleware = async (msg, next) => {
    if (msg.chat?.id != Config.CHAT_ID && msg.chat.type != 'private') return;

    if (!Admins.cache || Date.now() - Admins.lastCheck > 600 * 10) {
        await msg.telegram.getChatAdministrators(Config.CHAT_ID)
            .then( data => Admins.cache = data.map(el => el.user.id) )
        
        Admins.lastCheck = Date.now();
    }

    msg.from.isAdmin = Admins.cache.includes(msg.from.id);

    next();
}

export default AdminMiddleware;
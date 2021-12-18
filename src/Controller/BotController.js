import Config from '../Config.js'

import Log from '../Model/LogModel.js'

let GiveawayController = {
    LinkCheck: async msg => {
        if(msg.chat.id != Config.CHAT_ID || msg.from.isAdmin) return;

        try {
            msg.telegram.deleteMessage(msg.chat.id, msg.message.message_id)
                .catch(err => console.error(`Unable to delete ${msg.message.message_id}`) )
            msg.telegram.callApi('restrictChatMember', { chat_id: msg.chat.id, user_id: msg.from.id, until_date: (Date.now() + Config.BAN_PERIODS.LINK) / 1000 })
                .catch(err => console.error(`Unable to restrict ${msg.from.id}`))

            msg.telegram.sendMessage(msg.chat.id, Config.PHRASES.LINK_NOT_ALLOWED)
                .then(_msg => {
                    setTimeout(() => msg.telegram.deleteMessage(msg.chat.id, _msg.message_id).catch(err => console.error(`Unable to delete ${_msg.message_id}`)), 1 * 1000)
                })
                .catch(err => console.error(`Unable to send message`))

            let _log = new Log({ user_id: msg.from.id, username: msg.from.username || undefined, name: msg.from.first_name || undefined, chat_id: msg.chat.id, action: 'link', message: msg.message.text });
            _log.save();
        } catch (e) {
            console.error(e);
        }
    },
}

export default GiveawayController;

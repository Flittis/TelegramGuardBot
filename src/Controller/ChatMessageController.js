import Config from '../Config.js'
import Log from '../Model/LogModel.js'

class ChatMessageController {
    LinkMessage = async msg => {
        try {
            msg.telegram.deleteMessage(msg.chat.id, msg.message.message_id)
                .catch(err => console.error(`Unable to delete ${msg.message.message_id}`, err))
            msg.telegram.callApi('restrictChatMember', { chat_id: msg.chat.id, user_id: msg.from.id, until_date: (Date.now() + Config.BAN_PERIODS.LINK) / 1000 })
                .catch(err => console.error(`Unable to restrict ${msg.from.id}`, err))

            msg.tempReply(Config.PHRASES.CANT_MUTE_USER);

            let _log = new Log({ user_id: msg.from.id, username: msg.from.username || undefined, name: msg.from.first_name || undefined, chat_id: msg.chat.id, action: 'link', message: msg.message.text });
            _log.save();
        } catch (e) {
            console.error(e);
        }
    }

    MuteUser = async msg => {
        if (!msg.message.reply_to_message) return;

        try {
            msg.telegram.deleteMessage(msg.chat.id, msg.message.message_id)
                .catch(err => console.error(`Unable to delete ${msg.message.message_id}`, err))

            let User = msg.message.reply_to_message?.from?.id;

            if (!User) return;
            if (msg.admins.includes(User)) return msg.tempReply(Config.PHRASES.CANT_MUTE_USER);

            msg.telegram.callApi('restrictChatMember', { chat_id: msg.chat.id, user_id: User, until_date: (Date.now() + Config.BAN_PERIODS.LINK) / 1000 })
                .then(() => msg.tempReply(Config.PHRASES.MUTED_USER))
                .catch(err => {
                    msg.tempReply(Config.PHRASES.UNABLE_MUTE_USER)
                    console.error('Unable to restrict user', err)
                })
        } catch (e) {
            console.error(e);
        }
    }
}

export default new ChatMessageController;
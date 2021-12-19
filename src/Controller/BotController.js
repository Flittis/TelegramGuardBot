import Config from '../Config.js'

import BotService from '../Service/BotService.js'

import ChatMessageController from './ChatMessageController.js'
import PrivateMessageController from './PrivateMessageController.js'

class BotController {
    constructor() {
        BotService.ReadLinks()
    }

    Message = async msg => {
        if (msg.chat.id == Config.CHAT_ID) return this.ChatMessage(msg)
        if (msg.chat.type == 'private') return this.PrivateMessage(msg)
    }

    ChatMessage = async msg => {
        if (!msg.from.isAdmin && BotService.LinkRegular?.exec(msg.message.text)) return ChatMessageController.LinkMessage(msg)

        let temp;

        if (msg.from.isAdmin) {
            if ((temp = Config.COMMANDS.MUTE_USER.exec(msg.message.text))) return ChatMessageController.MuteUser(msg)
        }
    }

    PrivateMessage = async msg => {
        if (!msg.from.isAdmin) return;

        let temp;

        if ((temp = Config.COMMANDS.ADD_LINK.exec(msg.message.text))) return PrivateMessageController.AddLink(msg, temp)
    }
}

export default new BotController;

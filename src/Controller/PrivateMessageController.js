import Config from '../Config.js'
import BotService from '../Service/BotService.js';

class PrivateMessageController {
    AddLink = async (msg, match) => {
        if (!match[1]) return;
        if (match[1].indexOf('.') == -1) return msg.reply(Config.PHRASES.INVALID_LINK, { parse_mode: 'MarkdownV2' });

        let Link = match[1].replace(/(http|https)\:\/\//gi, '').split('/')[0];

        if (BotService.Links.includes(Link)) return msg.reply(Config.PHRASES.LINK_ALREADY_ADDED.replace('{{LINK}}', Link), { parse_mode: 'MarkdownV2' })

        BotService.AddLink(Link)

        msg.reply(Config.PHRASES.SAVED_LINK.replace('{{LINK}}', Link), { parse_mode: 'MarkdownV2' })
    }
}

export default new PrivateMessageController;
let LinksService = {
    createRegExp: function (array) { return new RegExp(`(${array.map(el => el.replace('.', '\\.')).join('|')})`, 'i') },
    links: [ 't.me', 'tg.me', 'bit.ly', 'cutt.ly', 'cutt.us', 'vk.cc', 'hideuri.com', 'gee.su', 'erotickoh.site', 'adultimeets.site', 'clck.ru', 'ow.ly', 'tinyurl.com' ]
}

export default LinksService;

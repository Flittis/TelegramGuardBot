let LinksService = {
    createRegExp: function (array) { return new RegExp(`(${array.join('|')})`, 'i') },
    links: [ 'tg.me', 'bit.ly', 'cutt.ly', 'cutt.us', 'vk.cc', 'hideuri.com', 'gee.su' ]
}

export default LinksService;
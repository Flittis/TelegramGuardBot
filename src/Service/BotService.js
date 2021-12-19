import { promises as fs } from 'fs'

class BotService {
    LinkRegular = null
    Links = [ ]
    
    CreateLinkRegular = array => new RegExp(`(${array.map(el => el.replace('.', '\\.')).join('|')})`, 'i')

    ReadLinks = async () => {
        try {
            let Links = JSON.parse(await fs.readFile('./src/Links.json', 'utf8')).links

            this.Links = Links
            this.LinkRegular = this.CreateLinkRegular(this.Links)

            console.log(`Read links from /src/Links.json`);
        } catch(e) {
            console.error(`Unable to read /src/Links.json`, e)
        }
    }
    SaveLinks = async () => {
        try {
            let Links = JSON.stringify({ links: this.Links }, null, 4)

            await fs.writeFile('./src/Links.json', Links)

            console.log(`Saved links to /src/Links.json`);
        } catch(e) {
            console.error(`Unable to save /src/Links.json`, e)
        }
    }
    AddLink = async link => {
        this.Links.push(link)
        this.LinkRegular = this.CreateLinkRegular(this.Links)

        this.SaveLinks()
    }
}

export default new BotService;

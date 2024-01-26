import BaseCommand from '../../libs/BaseCommand.js'

export default class Command extends BaseCommand {
    constructor(client, handler) {
        super(client, handler, {
            command: 'repo',
            category: 'core',
            description: {
                content: 'Gives you the repo link'
            },
            dm: true,
            exp: 10
        })
    }

    exec = async (M) => {
        const { open_issues_count, forks_count, stargazers_count, updated_at } = await this.client.util.fetch(
            `https://api.github.com/repos/Cipher0071/shadow`
        )
        return void (await M.replyRaw({
            text: '*https://github.com/Cipher0071/shadow.git*',
            contextInfo: {
                externalAdReply: {
                    title: `Updated at ${updated_at}`,
                    body: `openIssues: ${open_issues_count}\nForks: ${forks_count}\nStars: ${stargazers_count}`,
                    thumbnail: await this.client.util.fetchBuffer('https://i.pinimg.com/originals/63/a4/38/63a4386fd7b681ff490ac43e316e895b.jpg'),
                    mediaType: 1,
                    mediaUrl: '',
                    sourceUrl: 'https://github.com/Cipher0071/shadow.git',
                    ShowAdAttribution: true
                }
            }
        }))
    }
}

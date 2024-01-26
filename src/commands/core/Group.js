import BaseCommand from '../../libs/BaseCommand.js'

export default class Command extends BaseCommand {
    constructor(client, handler) {
        super(client, handler, {
            command: 'group',
            aliases: ['groupinfo', 'gcinfo'],
            category: 'core',
            description: {
                content: 'Get information about the group.'
            },
            exp: 7
        })
    }

    exec = async (M) => {
        const url =
            (await this.client.profilePictureUrl(M.from).catch(() => null)) ??
            'https://i.pinimg.com/originals/98/68/b7/9868b7e460482d0139a4c656a69f8a5f.jpg'

        return void (await M.replyRaw({
            image: { url },
            jpegThumbnail: (await this.client.util.fetchBuffer(url)).toString('base64'),
            contextInfo: {
                externalAdReply: {
                    title: `${M.group?.metadata.subject ?? 'N/A'}'s Infomation`,
                    body: '',
                    thumbnail: await this.client.util.fetchBuffer(url),
                    mediaType: 1,
                    mediaUrl: '',
                    sourceUrl: '',
                    ShowAdAttribution: true
                }
            },
            caption: `🏷️ *Group Subject: ${M.group?.metadata.subject ?? 'N/A'}*

🎖️ *Admins: ${M.group?.admins.length ?? 0}*

📋 *Total Members: ${M.group?.participants.length ?? 0}*
        
🍃 *Events: ${M.group.events ? 'Enabled' : 'Disabled'}*

⚡ *Mods: ${M.group.toggled.mods ? 'Enabled' : 'Disabled'}*

🔞 *Nsfw: ${M.group.toggled.nsfw ? 'Enabled' : 'Disabled'}*

🤖 *Chatbot: ${M.group.toggled.chatbot ? 'Enabled' : 'Disabled'}*

🌌 *Description:*
        
${M.group?.metadata.desc ?? 'N/A'}`
        }))
    }
}

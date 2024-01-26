import BaseCommand from '../../libs/BaseCommand.js'
import canvafy from 'canvafy'

export default class Command extends BaseCommand {
    constructor(client, handler) {
        super(client, handler, {
            command: 'ship',
            category: 'fun',
            description: {
                content: 'Ships you',
                usage: '[@mention | [quote-message]]'
            },
            exp: 3
        })
    }

    exec = async (M) => {
        try {
            if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
            while (M.mentioned.length < 2) M.mentioned.unshift(M.sender.jid)
            if (M.mentioned.includes(this.client.user.id)) return void (await M.reply("❌ You can't ship the bot"))
            const images = await Promise.all(
                M.mentioned.slice(0, 2).map(async (id) => {
                    return {
                        jid: id,
                        image: await this.client
                            .profilePictureUrl(id, 'image')
                            .catch(
                                () =>
                                    'https://static.wikia.nocookie.net/v__/images/7/73/Fuseu404notfound.png/revision/latest?cb=20171104190424&path-prefix=vocaloidlyrics'
                            )
                    }
                })
            )
            const level = this.level()
            let text = ''
            if (level >= 0 && level < 10) text = 'Awful'
            else if (level >= 10 && level < 25) text = 'Very Bad'
            else if (level >= 25 && level < 40) text = 'Poor'
            else if (level >= 40 && level < 55) text = 'Average'
            else if (level >= 55 && level < 75) text = 'Good'
            else if (level >= 75 && level < 90) text = 'Great'
            else if (level >= 90) text = 'Amazing'

            const image = await new canvafy.Ship()
                .setAvatars(images[0].image, images[1].image)
                .setBackground('image', 'https://i.pinimg.com/originals/73/a4/25/73a425df6ca299f1cb907376f19d6cab.png')
                .setBorder('#FF0000')
                .setCustomNumber(level)
                .setOverlayOpacity(0.5)
                .build()
            return void (await M.replyRaw({
                image,
                mentions: images.map((i) => i.jid),
                caption: `\`\`\`🔺Compatibility Meter🔺\`\`\`
💖 *${images.map((user) => `@${user.jid.split('@')[0]}`).join(' X ')}* 💖
*🔻 ${level} ${level < 50 ? '💔' : '💞'} ${text}* 🔻`
            }))
        } catch (e) {
            console.error(e)
        }
    }

    level = () => Math.floor(Math.random() * 100) + 1
}

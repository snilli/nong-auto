import {Client, validateSignature, WebhookEvent} from '@line/bot-sdk'
import {container} from 'tsyringe'
import {MessageParser} from './services/message-parser'
import {ConfigParser} from './services/config-parser'
import {WebhookRequestBody} from '@line/bot-sdk/lib/types'
import {Config} from './services/interfaces/config-parser.interface'
import {MessageGenerator} from './services/message-generator'

export class LineBot {
    static validateSignature(body: string, signature: string): WebhookRequestBody | undefined {
        const {channelSecret} = ConfigParser.get()
        if (validateSignature(body, channelSecret, signature)) {
            return JSON.parse(body) as WebhookRequestBody
        }

        return undefined
    }

    private readonly client: Client
    private readonly msgParser: MessageParser
    private readonly msgGenerator: MessageGenerator
    private readonly config: Config = ConfigParser.get()

    constructor() {
        const {channelAccessToken, channelSecret} = this.config
        this.client = new Client({channelAccessToken, channelSecret})
        this.msgParser = container.resolve(MessageParser)
        this.msgGenerator = container.resolve(MessageGenerator)
    }

    async run(events: WebhookEvent[]): Promise<void> {
        const replyMessages = events.map((event) => this.msgParser.parse(event))
        await Promise.all(replyMessages.map((replyMessage) => this.client.replyMessage(
            replyMessage.replyToken,
            replyMessage.message,
        )))

        // this.client.login(this.token).then(async () => {
        //     const guild = this.client.guilds.find(guild => guild.name === this.guild)
        //     if (!guild) {
        //         throw new Error('Guild not found')
        //     }
        //
        //     const channel = guild.channels.find(channel => channel.name === this.channel)
        //     if (!channel) {
        //         throw new Error('Channel not found')
        //     }
        //
        //     console.log(`Logged In: ${this.client.user.username}`)
        //     console.log(`Server: ${guild.name}, Channel: ${channel.name}`)
        //
        //     channel.client.on('message', async (msg) => {
        //         if (this.isMessageFromChannel(msg)) {
        //             if (this.isMessageFromOwner(msg)) {
        //                 if (msg.content === '.bot start' && !this.bot.isRunning()) {
        //                     this.bot.run()
        //                     const action = await this.bot.start()
        //                     await this.sendAction(msg, action)
        //                 } else if (msg.content === '.bot stop') {
        //                     this.bot.stop()
        //                     return
        //                 }
        //             }
        //
        //             if (this.bot.isRunning() && this.isMessageFromMyuu(msg)) {
        //                 const myuuMsg = this.msgParser.parse(msg)
        //                 if (!myuuMsg) {
        //                     return
        //                 }
        //
        //                 const action = await this.bot.getAction(myuuMsg)
        //                 await this.sendAction(msg, action)
        //             }
        //         }
        //     })
        // })
    }

    // private async sendAction(msg: Message, actions?: string | string[] | undefined): Promise<void> {
    //     if (actions) {
    //         if (Array.isArray(actions)) {
    //             for (const action of actions) {
    //                 await this.sleep(this.delay)
    //                 await msg.channel.send(action)
    //             }
    //         } else {
    //             await this.sleep(this.delay)
    //             await msg.channel.send(actions)
    //         }
    //     }
    // }

    // private isMessageFromChannel(msg: Message): boolean {
    //     return (msg.channel as TextChannel).name === this.channel
    //         && msg.guild.name === this.guild
    // }
    //
    // private isMessageFromOwner(msg: Message): boolean {
    //     return msg.member &&
    //         msg.member.user &&
    //         msg.member.user.username === this.username
    // }
    //
    // private isMessageFromMyuu(msg: Message): boolean {
    //     return msg.member &&
    //         msg.member.user &&
    //         msg.member.user.username === this.myuuUsername
    // }
    //
    // private async sleep(ms): Promise<void> {
    //     return new Promise((resolve) => setTimeout(resolve, ms))
    // }
}

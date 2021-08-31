import {Client, validateSignature, WebhookEvent} from '@line/bot-sdk'
import {container} from 'tsyringe'
import {EventParser} from './services/event-parser'
import {ConfigParserService} from './services/config-parser-service'
import {WebhookRequestBody} from '@line/bot-sdk/lib/types'
import {Config} from './services/interfaces/config-parser.interface'
import {MessageGenerator} from './services/message-generator'

export class LineBot {
    static validateSignature(body: string, signature: string): WebhookRequestBody | undefined {
        const {channelSecret} = ConfigParserService.get()
        if (validateSignature(body, channelSecret, signature)) {
            return JSON.parse(body) as WebhookRequestBody
        }

        return undefined
    }

    private readonly client: Client
    private readonly msgParser: EventParser
    private readonly msgGenerator: MessageGenerator
    private readonly config: Config = ConfigParserService.get()

    constructor() {
        const {channelAccessToken, channelSecret} = this.config
        const client = new Client({channelAccessToken, channelSecret})
        container.registerInstance(Client, client)
        this.client = client
        this.msgParser = container.resolve(EventParser)
        this.msgGenerator = container.resolve(MessageGenerator)
    }

    async run(events: WebhookEvent[]): Promise<void> {
        const replyMessages = await Promise.all(events.map((event) => this.msgParser.parse(event)))
        for (const replyMessage of replyMessages) {
            await this.client.replyMessage(replyMessage.replyToken, replyMessage.message)
        }

    }
}

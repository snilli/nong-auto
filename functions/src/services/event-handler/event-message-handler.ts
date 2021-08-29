import {ImageEventMessage, MessageEvent, TextEventMessage} from '@line/bot-sdk/lib/types'
import {ReplyMessage} from './interfaces/event-handler.interface'
import {injectable} from 'tsyringe'
import {MessageGenerator} from '../message-generator'
import {Context} from '../../core/context/query/context'
import {ContextService} from '../context-service'

@injectable()
export class EventMessageHandler {
    private context?: Context

    constructor(
        private messageGenerator: MessageGenerator,
        private contextService: ContextService,
    ) {}

    handleError(event: MessageEvent): ReplyMessage {
        return this.defalutParser(event.replyToken)
    }

    async handle(event: MessageEvent, userId: string): Promise<ReplyMessage> {
        await this.getContext(event, userId)

        switch (event.message.type) {
            case 'text':
                return this.textParser(event.replyToken, event.message)
            case 'image':
                return this.imageParser(event.replyToken, event.message)
            default:
                return this.defalutParser(event.replyToken)
        }
    }

    private async getContext(event: MessageEvent, userId: string): Promise<void> {
        if (event.message.type === 'text') {
            this.context = await this.contextService.getContext(userId)
            if (!this.context) {
                this.context = await this.contextService.createContext(userId, event.message.text)
            }
        }
    }

    private textParser(replyToken: string, message: TextEventMessage): ReplyMessage {
        return {
            replyToken,
            message: {
                type: 'text',
                text: 'a',
            },
        }
    }

    private imageParser(replyToken: string, message: ImageEventMessage): ReplyMessage {
        return {
            replyToken,
            message: {
                type: 'text',
                text: 'a',
            },
        }
    }

    private defalutParser(replyToken: string): ReplyMessage {
        return {
            replyToken,
            message: {
                type: 'text',
                text: this.messageGenerator.getDefaultMessage(),
            },
        }
    }
}

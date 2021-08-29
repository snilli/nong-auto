import {ImageEventMessage, MessageEvent, TextEventMessage} from '@line/bot-sdk/lib/types'
import {ReplyMessage} from './interfaces/event-handler.interface'
import {injectable} from 'tsyringe'
import {MessageGenerator} from '../message-generator'
import {Context} from '../../core/context/query/context'
import {ContextService} from '../context-service'
import {ActionNotFoundException} from '../../core/context/error'

@injectable()
export class EventMessageHandler {
    private context?: Context

    constructor(
        private messageGenerator: MessageGenerator,
        private contextService: ContextService,
    ) {}

    handleError(event: MessageEvent): ReplyMessage {
        return this.defaultReply(event.replyToken)
    }

    async handle(event: MessageEvent, userId: string): Promise<ReplyMessage> {
        await this.getContext(event, userId)

        switch (event.message.type) {
            case 'text':
                return this.textParser(event.replyToken, event.message)
            case 'image':
                return this.imageParser(event.replyToken, event.message)
            default:
                return this.defaultReply(event.replyToken)
        }
    }

    private async getContext(event: MessageEvent, userId: string): Promise<void> {
        this.context = await this.contextService.getContext(userId)
        if (!this.context) {
            try {
                if (event.message.type === 'text') {
                    this.context = await this.contextService.createContext(userId, event.message.text)
                }
            } catch (e) {
                if (!(e instanceof ActionNotFoundException)) {
                    throw e
                }
            }
        }
    }

    private textParser(replyToken: string, message: TextEventMessage): ReplyMessage {
        if (!this.context) {
            return this.defaultReply(replyToken)
        }

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

    private defaultReply(replyToken: string): ReplyMessage {
        return {
            replyToken,
            message: {
                type: 'text',
                text: this.messageGenerator.getDefaultMessage(),
            },
        }
    }
}

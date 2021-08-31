import {ImageEventMessage, MessageEvent, TextEventMessage} from '@line/bot-sdk/lib/types'
import {ReplyMessage} from './interfaces/event-handler.interface'
import {injectable} from 'tsyringe'
import {MessageGenerator} from '../message-generator'
import {ContextService} from '../context-service'
import {Context} from '../../core/context/query/context'
import {Reply} from '../../core/context/query/action-info.interface'
import {ImageService} from '../image-service'

@injectable()
export class EventMessageHandler {
    private contextMap: Map<string, Context> = new Map<string, Context>()

    constructor(
        private messageGenerator: MessageGenerator,
        private contextService: ContextService,
        private imageService: ImageService,
    ) {}

    handleError(event: MessageEvent): ReplyMessage {
        return {
            replyToken: event.replyToken,
            message: this.messageGenerator.getDefaultMessage(),
        }
    }

    async handle(event: MessageEvent, userId: string): Promise<ReplyMessage> {

        switch (event.message.type) {
            case 'text':
                return this.textParser(userId, event.replyToken, event.message)
            case 'image':
                return this.imageParser(userId, event.replyToken, event.message)
            default:
                return {
                    replyToken: event.replyToken,
                    message: this.messageGenerator.getDefaultMessage(),
                }
        }
    }

    private async getContext(userId: string, value: string): Promise<Context | undefined> {
        let context = this.contextMap.get(userId)
        if (context) {
            return context
        }

        context = await this.contextService.getContext(userId, value)
        if (context) {
            this.contextMap.set(context.getId(), context)
        }

        return context
    }

    private async fullfillContext(context: Context, value: string): Promise<Reply> {
        if (!context.isPublic()) {
            return context.firstReply()
        }

        const fullfill = await this.contextService.fullfillContext(context, value)
        if (fullfill) {
            if (fullfill.complete) {
                this.contextMap.delete(context.getId())
            }

            return fullfill.reply
        }

        return this.messageGenerator.getDefaultMessage()
    }

    private async textParser(userId: string, replyToken: string, message: TextEventMessage): Promise<ReplyMessage> {
        const context = await this.getContext(userId, message.text)
        if (!context) {
            return {
                replyToken,
                message: this.messageGenerator.getDefaultMessage(),
            }
        }
        const reply = await this.fullfillContext(context, message.text)

        return {
            replyToken,
            message: this.messageGenerator.parser(reply),
        }
    }

    private async imageParser(userId: string, replyToken: string, message: ImageEventMessage): Promise<ReplyMessage> {
        const url = this.imageService.genLineMediaUrl(message.id)
        const context = await this.getContext(userId, url)
        if (!context) {
            return {
                replyToken,
                message: this.messageGenerator.getDefaultMessage(),
            }
        }

        const reply = await this.fullfillContext(context, url)

        return {
            replyToken,
            message: this.messageGenerator.parser(reply),
        }
    }
}

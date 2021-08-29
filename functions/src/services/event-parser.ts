import {container, singleton} from 'tsyringe'
import {MessageEvent, WebhookEvent} from '@line/bot-sdk/lib/types'
import {ReplyMessage} from './event-handler/interfaces/event-handler.interface'
import {EventMessageHandler} from './event-handler/event-message-handler'
import {SourceParser} from './event-handler/source-parser'

@singleton()
export class EventParser {
    private eventMessageHanler: EventMessageHandler

    constructor() {
        this.eventMessageHanler = container.resolve(EventMessageHandler)
    }

    async parse(event: WebhookEvent): Promise<ReplyMessage> {
        const a = event as MessageEvent
        const userId = SourceParser.getUserId(event.source)
        if (!userId) {
            return this.eventMessageHanler.handleError(event as MessageEvent)
        }

        if (event.type === 'message') {
            return this.eventMessageHanler.handle(event, userId)
        }

        return {
            replyToken: a.replyToken,
            message: {
                type: 'text',
                text: '55555',
            },
        }
    }

}

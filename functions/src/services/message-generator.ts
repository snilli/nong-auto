import {singleton} from 'tsyringe'
import {TextMessage} from '@line/bot-sdk/lib/types'

@singleton()
export class MessageGenerator {
    text(msg: string): TextMessage {
        return {
            text: msg,
            type: 'text',
        }
    }
}

import {singleton} from 'tsyringe'
import {TextMessage} from '@line/bot-sdk/lib/types'

@singleton()
export class MessageGenerator {
    protected defaultMessage: string[] = [
        'aaaaa',
    ]

    private static random(strArr: string[]): string {
        return strArr[Math.floor(Math.random() * strArr.length)]
    }

    getDefaultMessage(): string {
        return MessageGenerator.random(this.defaultMessage)
    }

    text(msg: string): TextMessage {
        return {
            text: msg,
            type: 'text',
        }
    }
}

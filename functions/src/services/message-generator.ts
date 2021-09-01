import {injectable} from 'tsyringe'
import {Message, TextMessage} from '@line/bot-sdk/lib/types'
import {Reply} from '../core/context/query/action-info.interface'

@injectable()
export class MessageGenerator {
    protected defaultMessage: string[] = [
        'aaaaa',
    ]

    protected defaultWelcomeMessage: string[] = [
        'Hello',
    ]

    private static random(strArr: string[]): string {
        return strArr[Math.floor(Math.random() * strArr.length)]
    }

    getDefaultMessage(): TextMessage {
        return this.text(MessageGenerator.random(this.defaultMessage))
    }

    getDefaultWelcomeMessage(): TextMessage {
        return this.text(MessageGenerator.random(this.defaultWelcomeMessage))
    }

    text(msg: string): TextMessage {
        return {
            text: msg,
            type: 'text',
        }
    }

    parser(reply: Reply): Message {
        switch (reply.type) {
            case 'text':
                return {
                    type: 'text',
                    text: reply.text,
                }
            case 'confirm':
                return {
                    type: 'template',
                    altText: reply.title,
                    template: {
                        type: 'confirm',
                        actions: [
                            {
                                type: 'message',
                                label: reply.bottons[0].label,
                                text: reply.bottons[0].text,
                            },
                            {
                                type: 'message',
                                label: reply.bottons[1].label,
                                text: reply.bottons[1].text,
                            },
                        ],
                        text: reply.title,
                    },
                }
            default:
                return this.getDefaultMessage()
        }
    }
}

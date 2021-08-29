import {Message} from '@line/bot-sdk'

export interface ReplyMessage {
    replyToken: string
    message: Message
}

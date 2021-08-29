export interface ReplyText {
    replyType: 'text'
    text: string
}

export type MessageType = 'text' | 'image'

export interface ActionConfirmButton {
    text: string
    label: string
}

export interface ReplyConfirm {
    replyType: 'confirm'
    title: string
    bottons: ActionConfirmButton[]
}

export type Reply = ReplyText | ReplyConfirm

export interface ActionInfo {
    reply: Reply
    messageType: MessageType
    checkValue?: string
    replyType: string
    value?: string
    errReply: string
    nextAction: number
    lastAction: boolean
}

export interface ActionTextInput {
    text: string
    requireValue: boolean
    nextAction: number
    messageType: MessageType
    errReply: string
}

export interface ActionConfirmInput {
    title: string
    bottons: ActionConfirmButton[]
    requireValue: boolean
    nextAction: number
    messageType: MessageType
    errReply: string
}

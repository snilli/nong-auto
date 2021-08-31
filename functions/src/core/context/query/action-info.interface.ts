export interface ReplyText {
    type: 'text'
    text: string
}

export interface ActionConfirmButton {
    text: string
    label: string
}

export interface ReplyConfirm {
    type: 'confirm'
    title: string
    bottons: ActionConfirmButton[]
}

export type Reply = ReplyText | ReplyConfirm

export interface ActionDetail {
    reply: Reply
    checkValue?: string
    value?: string
    errReply: string
    nextAction: number
    lastAction: boolean
}

export interface ActionTextInput {
    text: string
    nextAction: number
    errReply: string
    checkValue?: string
    lastAction: boolean
}

export interface ActionConfirmInput {
    title: string
    bottons: ActionConfirmButton[]
    nextAction: number
    errReply: string
    checkValue?: string
    lastAction: boolean
}

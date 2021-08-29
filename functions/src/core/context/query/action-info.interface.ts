export interface ActionText extends Action {
    replyType: 'text'
    text: string
}

export type MessageType = 'text' | 'image'

export interface ActionConfirmButton {
    text: string
    label: string
}

export interface ActionConfirm extends Action {
    replyType: 'confirm'
    title: string
    bottons: ActionConfirmButton[]
}

export type ActionInfo = ActionText | ActionConfirm

export interface Action {
    messageType: MessageType
    replyType: string
    requireValue: boolean
    value?: string
    nextAction: number
}

export interface ActionTextInput {
    text: string
    requireValue: boolean
    nextAction: number
    messageType: MessageType
}

export interface ActionConfirmInput {
    title: string
    bottons: ActionConfirmButton[]
    requireValue: boolean
    nextAction: number
    messageType: MessageType
}

import {ActionConfirm, ActionConfirmInput, ActionInfo, ActionText, ActionTextInput} from './action-info.interface'

export class ActionManager {
    static getAction(actionName: string): ActionInfo[] {
        switch (actionName) {
            case 'create-pdf':
                return ActionManager.genCreatePdfAction()
            default:
                return []
        }

    }

    static messageToActionName(message: string): string | undefined {
        return ActionManager.nameMapper.find((n) => n.text === message)?.name
    }

    private static nameMapper: Array<{
        name: string
        text: string
    }> = [
        {
            name: 'create-pdf',
            text: 'gen pdf',
        },
    ]

    private static genCreatePdfAction(): ActionInfo[] {
        const actions: ActionText[] = []
        const totalImage = 6
        for (let i = 0; i < totalImage; i++) {
            actions.push(ActionManager.actionText({
                messageType: 'image',
                nextAction: i + 2,
                requireValue: true,
                text: `สามารถอัพได้อีก ${totalImage - i} รูป มีรูปที่ต้องการใส่เพิ่มอีกไหม? ถ้ามีโยนมาได้เลย หากสิ้นสุดแล้วให้พิมพ์ว่า หยุด `,
            }))
        }

        return [
            ActionManager.actionText({
                messageType: 'text',
                nextAction: 1,
                requireValue: false,
                text: 'ใส่รูปที่ต้องการสร้าง PDF มาได้เลย แต่เราเก็บให้สูงสุดได้แค่ 6 รูปนะ',
            }),
            ...actions,
            ActionManager.actionText({
                messageType: 'text',
                nextAction: 8,
                requireValue: true,
                text: 'เสร็จแล้วจ้า',
            }),
        ]
    }

    private static actionText({text, requireValue, nextAction, messageType}: ActionTextInput): ActionText {
        return {
            replyType: 'text',
            text,
            requireValue,
            nextAction,
            messageType,
        }
    }

    private static actionConfirm({
        title,
        bottons,
        requireValue,
        nextAction,
        messageType,
    }: ActionConfirmInput): ActionConfirm {
        return {
            replyType: 'confirm',
            title,
            bottons,
            requireValue,
            nextAction,
            messageType,
        }
    }
}

//
// มี context ยัง
// มีแล้วไปอ่าน action และ reply
//
// ไม่มี ให้สร้าง context แล้วอ่าน action แล้ว reply
//
// ถ้า action หมดแล้ว ให้ เรียน usecase excute ข้อมูล

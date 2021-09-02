import {ActionConfirmInput, ActionDetail, ActionTextInput} from './action-info.interface'

export class ActionManager {
    static getAction(actionName: string): ActionDetail[] {
        switch (actionName) {
            case 'create-pdf':
                return ActionManager.genCreatePdfAction()
            default:
                return []
        }
    }

    static messageToActionName(message: string): string | undefined {
        return ActionManager.nameMapper.find((n) => n.text.includes(message))?.name
    }

    private static nameMapper: Array<{
        name: string
        text: string[]
    }> = [
        {
            name: 'create-pdf',
            text: ['gen pdf'],
        },
    ]

    private static genCreatePdfAction(): ActionDetail[] {
        const actions: ActionDetail[] = []
        const totalImage = 6
        for (let i = 0; i < totalImage; i++) {
            actions.push(ActionManager.actionText({
                nextAction: i + 2,
                lastAction: false,
                text: `สามารถอัพได้อีก ${totalImage - i} รูป มีรูปที่ต้องการใส่เพิ่มอีกไหม? ถ้ามีโยนมาได้เลย หากสิ้นสุดแล้วให้พิมพ์ว่า หยุด `,
                endValue: 'จบ',
                errReply: 'error upload',
            }))
        }

        return [
            ActionManager.actionText({
                lastAction: false,
                nextAction: 1,
                text: 'ใส่ชื่อไฟล์ที่ต้องการ',
                errReply: 'error name',
            }),
            ...actions,
            ActionManager.actionConfirm({
                lastAction: false,
                nextAction: 8,
                validateValue: 'ยืนยัน',
                endValue: 'ยกเลิก',
                title: 'กรุณายืนยันความถูกต้อง',
                bottons: [
                    {
                        text: 'ยืนยัน',
                        label: 'ยืนยัน',
                    },
                    {
                        text: 'ยกเลิก',
                        label: 'ยกเลิก',
                    },
                ],
                errReply: 'error save',
            }),
            ActionManager.actionText({
                lastAction: true,
                nextAction: 0,
                text: 'เสร็จแล้วจ้า',
                errReply: 'error save',
            }),
        ]
    }

    private static actionText({text, lastAction, nextAction, validateValue, errReply}: ActionTextInput): ActionDetail {
        return {
            reply: {
                type: 'text',
                text,
            },
            lastAction,
            nextAction,
            validateValue: validateValue,
            errReply,
        }
    }

    private static actionConfirm({
        title,
        bottons,
        nextAction,
        errReply,
        validateValue,
        lastAction,
    }: ActionConfirmInput): ActionDetail {
        return {
            reply: {
                type: 'confirm',
                bottons,
                title,
            },
            validateValue: validateValue,
            errReply,
            nextAction,
            lastAction,
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

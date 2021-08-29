import {Query} from '../../../common/query'
import {ActionInfo, Reply} from './action-info.interface'
import {ActionManager} from './action-manager'
import {ActionNotFoundException, MaxWrongMessageException} from '../error'

export interface ContextState {
    id: string
    name: string
    actionInfo: ActionInfo[]
    complete: boolean
    wrong: number
    currentAction: number
    createdAt: Date
    updatedAt: Date
}

export class Context extends Query<ContextState> {
    static create(userId: string, message: string): Context {
        const now = new Date(Date.now())
        const name = ActionManager.messageToActionName(message)
        if (!name) {
            throw new ActionNotFoundException()
        }

        return new Context({
            id: userId,
            name,
            wrong: 0,
            currentAction: 0,
            actionInfo: ActionManager.getAction(name),
            createdAt: now,
            complete: false,
            updatedAt: now,
        })
    }

    protected state: ContextState
    private maxWrong: number

    constructor(input: ContextState) {
        super()
        this.state = {
            id: input.id,
            name: input.name,
            wrong: input.wrong,
            currentAction: input.currentAction,
            actionInfo: input.actionInfo,
            createdAt: input.createdAt,
            complete: input.complete,
            updatedAt: input.updatedAt,
        }
    }

    get complete(): boolean {
        return this.state.complete
    }

    get wrong(): number {
        return this.state.wrong
    }

    get currentAction(): number {
        return this.state.currentAction
    }

    get name(): string {
        return this.state.name
    }

    get actionInfo(): ActionInfo[] {
        return this.state.actionInfo
    }

    get createdAt(): Date {
        return this.state.createdAt
    }

    get updatedAt(): Date {
        return this.state.updatedAt
    }

    private static validFullfillAction(action: ActionInfo, value: string): boolean {
        if (action.checkValue) {
            if (action.checkValue === value) {
                action.value = value

                return true
            } else {
                return false
            }
        }

        return true
    }

    private static replyError(errorMessage: string): Reply {
        return {
            text: errorMessage,
            replyType: 'text',
        }
    }

    getId(): string {
        return this.state.id
    }

    fullfillAction(value: string): [boolean, Reply] {
        const action = this.getCurrentAction()
        const now = new Date()
        if (Context.validFullfillAction(action, value)) {
            action.value = value

            if (action.lastAction) {
                this.state.complete = true
            } else {
                this.state.currentAction = action.nextAction
            }

            this.state.updatedAt = now

            return [true, action.reply]
        }

        if (this.state.wrong === this.maxWrong) {
            throw new MaxWrongMessageException()
        }

        this.state.wrong += 1
        this.state.updatedAt = now

        return [false, Context.replyError(action.errReply)]
    }

    getCurrentAction(): ActionInfo {
        return this.getAction(this.currentAction)
    }

    private getAction(index: number): ActionInfo {
        return this.state.actionInfo[index]
    }

    // nextAction(messageType: string): void {
    //     const action = this.getCurrentAction()
    //     if (action?.) {
    //
    //     }
    // }

    // addAction(action: string): void {
    //     const now = new Date(Date.now())
    //     this.state.count += 1
    //     this.state.actionInfo.push({name: action})
    //     this.state.updatedAt = now
    // }
    //
    // doAction(actionName: string, value: string): void {
    //     const now = new Date(Date.now())
    //     const findInfo = this.actionInfo.find((info) => info.name === actionName)
    //     if (!findInfo) {
    //         throw Error('action not found')
    //     }
    //
    //     findInfo.value = value
    //     this.state.complete += 1
    //     this.state.updatedAt = now
    // }
    //
    // isComplete(): boolean {
    //     return this.state.count === this.state.complete && this.isFullfillValue()
    // }
}

import {Query} from '../../../common/query'
import {ActionInfo} from './action-info.interface'
import {ActionManager} from './action-manager'

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
            throw Error('action name not found')
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

    getId(): string {
        return this.state.id
    }

    private nextAction(messageType: string): void {
        const action = this.state.actionInfo[this.currentAction]
        if (action.messageType === messageType) {

        }
    }

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

import {Query} from '../../../common/query'
import {ActionDetail, Reply} from './action-info.interface'
import {ActionNotFoundException, MaxWrongMessageException} from '../error'
import {Actions, FullfillValue} from './actions'
import {ActionManager} from './action-manager'

export interface ContextState {
    id: string
    name: string
    actionInfo: Actions
    complete: boolean
    wrong: number
    isPublic: boolean
    currentAction: number
    createdAt: Date
    updatedAt: Date
}

export class Context extends Query<ContextState> {
    static create(userId: string, message: string): Context {
        const now = new Date(Date.now())
        const actionName = ActionManager.messageToActionName(message)
        if (!actionName) {
            throw new ActionNotFoundException()
        }

        return new Context({
            id: userId,
            name: actionName,
            wrong: 0,
            currentAction: 0,
            actionInfo: new Actions(ActionManager.getAction(actionName)),
            isPublic: false,
            createdAt: now,
            complete: false,
            updatedAt: now,
        })
    }

    protected state: ContextState
    private readonly maxWrong: number = 3

    constructor(input: ContextState) {
        super()
        this.state = {
            id: input.id,
            name: input.name,
            wrong: input.wrong,
            currentAction: input.currentAction,
            actionInfo: input.actionInfo,
            complete: input.complete,
            isPublic: input.isPublic,
            createdAt: input.createdAt,
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

    get actionInfo(): ActionDetail[] {
        return this.state.actionInfo.toJSON()
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

    firstReply(): Reply {
        this.state.isPublic = true

        return this.state.actionInfo.firstReply()
    }

    isPublic(): boolean {
        return this.state.isPublic
    }

    fullfillAction(value: string): FullfillValue {
        if (this.isMaxWrong()) {
            throw new MaxWrongMessageException()
        }
        const now = new Date()
        const res = this.state.actionInfo.fullfillValue(this.currentAction, value)
        if (res.success) {
            this.state.currentAction = res.action
            this.state.complete = res.complete
            this.state.updatedAt = now

            return res
        }

        this.state.wrong += 1
        this.state.updatedAt = now

        return res
    }

    isMaxWrong(): boolean {
        return this.maxWrong === this.state.wrong
    }

    public toJSON(): ContextState {
        return {
            actionInfo: this.state.actionInfo.toJSON() as unknown as Actions,
            complete: this.state.complete,
            createdAt: this.state.createdAt,
            currentAction: this.state.currentAction,
            id: this.state.id,
            isPublic: this.state.isPublic,
            name: this.state.name,
            updatedAt: this.state.updatedAt,
            wrong: this.state.wrong,
        }
    }
}

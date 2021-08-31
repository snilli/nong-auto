import {ActionDetail, Reply} from './action-info.interface'
import {Action} from './action'
import {ActionNotFoundException} from '../error'

export interface FullfillValue {
    success: boolean
    reply: Reply
    action: number
    complete: boolean
}

export class Actions {
    private readonly actions: Map<number, Action>

    constructor(actions: ActionDetail[]) {
        const actionMap = new Map()
        for (const [i, action] of actions.entries()) {
            actionMap.set(i, new Action(action))
        }

        this.actions = actionMap
    }

    firstReply(): Reply {
        return this.findAction(0).reply()
    }

    fullfillValue(index: number, value: string): FullfillValue {
        const action = this.findAction(index)
        const change = action.fullfill(value)
        if (change) {
            const nextAction = this.findAction(action.nextAction())

            return {
                success: true,
                reply: nextAction.reply(),
                complete: nextAction.isLastAction(),
                action: action.nextAction(),
            }
        }

        return {
            success: false,
            reply: action.errorReply(),
            complete: false,
            action: index,
        }
    }

    findAction(index: number): Action {
        const action = this.actions.get(index)
        if (!action) {
            throw new ActionNotFoundException
        }

        return action
    }

    toJSON(): ActionDetail[] {
        const actions: ActionDetail[] = []
        this.actions.forEach((action) => {
            actions.push(action.toJSON())
        })

        return actions
    }
}

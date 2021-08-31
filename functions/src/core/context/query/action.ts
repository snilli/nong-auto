import {ActionDetail, Reply} from './action-info.interface'

export class Action {
    private readonly action: ActionDetail

    constructor(action: ActionDetail) {
        this.action = action
    }

    nextAction(): number {
        return this.action.nextAction
    }

    isLastAction(): boolean {
        return this.action.lastAction
    }

    errorReply(): Reply {
        return {
            type: 'text',
            text: this.action.errReply,
        }
    }

    reply(): Reply {
        return this.action.reply
    }

    fullfill(value: string): boolean {
        if (this.validateFullfill(value)) {
            this.action.value = value

            return true
        }

        return false
    }

    validateFullfill(value: string): boolean {
        if (!this.action.checkValue) {
            return true
        }

        return this.action.checkValue === value
    }

    toJSON(): ActionDetail {
        return this.action
    }
}

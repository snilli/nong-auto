import {FunctionError} from '../../common/error'

export class ActionNotFoundException extends FunctionError {
    constructor() {
        super('Action name not found')
    }
}

export class MaxWrongMessageException extends FunctionError {
    constructor() {
        super('Max wrong message')
    }
}

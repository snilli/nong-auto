import {FunctionError} from '../../common/error'

export class DataFactoryNotFound extends FunctionError {
    constructor() {
        super('Data factory not found')
    }
}

import {ActionDetail, Reply} from '../../core/context/query/action-info.interface'
import {DataFactoryNotFound} from './error'
import {injectable} from 'tsyringe'
import {GenPdfActionParser} from './gen-pdf-action-parser'

@injectable()
export class ActionParser {
    constructor(
        private genPdfActionParser: GenPdfActionParser,
    ) {}

    async parse(actionName: string, actions: ActionDetail[], userId: string): Promise<Reply> {
        switch (actionName) {
            case 'create-pdf':
                return await this.genPdfActionParser.execute(actionName, actions, userId)
            default:
                throw new DataFactoryNotFound()
        }
    }
}

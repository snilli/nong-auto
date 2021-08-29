import {FirestoreRepo} from '../../../common/firestore-repo'
import {Context, ContextState} from '../query/context'
import {injectable} from 'tsyringe'

@injectable()
export class ContextRepo extends FirestoreRepo<Context> {
    constructor() {
        super({
            collection: 'context',
            createFactory(payload: ContextState): Context {
                return new Context({
                    actionInfo: payload.actionInfo,
                    complete: payload.complete,
                    createdAt: payload.createdAt,
                    currentAction: payload.currentAction,
                    id: payload.id,
                    name: payload.name,
                    updatedAt: payload.updatedAt,
                    wrong: payload.wrong,
                })
            },
        })
    }
}

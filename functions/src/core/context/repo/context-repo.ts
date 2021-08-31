import {FirestoreRepo} from '../../../common/firestore-repo'
import {Context, ContextState} from '../query/context'
import {injectable} from 'tsyringe'
import {Actions} from '../query/actions'
import {ActionDetail} from '../query/action-info.interface'

@injectable()
export class ContextRepo extends FirestoreRepo<Context> {
    constructor() {
        super({
            collection: 'context',
            createFactory(payload: ContextState): Context {
                const actions = payload.actionInfo as unknown as ActionDetail[]

                return new Context({
                    actionInfo: new Actions(actions),
                    complete: payload.complete,
                    createdAt: payload.createdAt,
                    currentAction: payload.currentAction,
                    id: payload.id,
                    isPublic: payload.isPublic,
                    name: payload.name,
                    updatedAt: payload.updatedAt,
                    wrong: payload.wrong,
                })
            },
        })
    }
}

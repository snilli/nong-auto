import {injectable} from 'tsyringe'
import {ContextRepo} from '../repo/context-repo'
import {Context} from '../query/context'
import {ActionNotFoundException} from '../error'
import {MessageType} from '../query/action-info.interface'

@injectable()
export class GetActionContextUseCase {
    constructor(
        private repo: ContextRepo,
    ) {}

    async execute(userId: string, type: MessageType, value: string): Promise<Context | undefined> {
        let context = await this.repo.getDocData(userId)
        if (context) {
            return context
        }

        try {
            if (type === 'text') {
                context = Context.create(userId, value)
                await this.repo.setDoc(context)

                return context
            }
        } catch (e) {
            if (e instanceof ActionNotFoundException) {
                return undefined
            }
        }

        return undefined
    }
}

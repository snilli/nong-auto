import {injectable} from 'tsyringe'
import {ContextRepo} from '../repo/context-repo'
import {Context} from '../query/context'
import {FullfillValue} from '../query/actions'
import {MaxWrongMessageException} from '../error'

@injectable()
export class FullfillContextUseCase {
    constructor(
        private repo: ContextRepo,
    ) {}

    async execute(context: Context, value: string): Promise<FullfillValue | undefined> {
        try {
            const res = context.fullfillAction(value)
            if (res.success) {
                if (res.complete) {
                    await this.repo.deleteDoc(context.getId())

                    return context.complete ? res : undefined
                }
                await this.repo.setDoc(context)
            }

            return res
        } catch (e) {
            if (e instanceof MaxWrongMessageException) {
                return undefined
            }
        }

        return undefined
    }
}

import {injectable} from 'tsyringe'
import {ContextRepo} from '../repo/context-repo'
import {Context} from '../query/context'
import {ActionNotFoundException} from '../error'
import {Reply} from '../query/action-info.interface'

@injectable()
export class GetReplyContextUseCase {
    constructor(
        private repo: ContextRepo,
    ) {}

    async execute(userId: string, value: string): Promise<Reply | undefined> {
        let context = await this.repo.getDocData(userId)
        if (!context) {
            try {
                context = Context.create(userId, value)
                await this.repo.setDoc(context)

                return context.firstReply()
            } catch (e) {
                if (e instanceof ActionNotFoundException) {
                    return undefined
                }
            }

            return undefined
        }

        const res = context.fullfillAction(value)

        if (res.success) {
            if (res.complete) {
                await this.repo.deleteDoc(context.getId())

                if (context.complete) {
                    return res.reply
                } else if (context.isMaxWrong()) {
                    return undefined
                }
            }

            await this.repo.setDoc(context)
        }

        return res.reply
    }
}

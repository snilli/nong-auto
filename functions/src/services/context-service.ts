import {injectable} from 'tsyringe'
import {GetContextUseCase} from '../core/context/use-case/get-context-use-case'
import {CreateContextUseCase} from '../core/context/use-case/create-context-use-case'
import {Context} from '../core/context/query/context'
import {GetReplyContextUseCase} from '../core/context/use-case/get-reply-context-use-case'
import {Reply} from '../core/context/query/action-info.interface'
import {ActionNotFoundException} from '../core/context/error'
import {FullfillContextUseCase} from '../core/context/use-case/fullfill-context-use-case'
import {FullfillValue} from '../core/context/query/actions'

@injectable()
export class ContextService {
    constructor(
        private getContextUseCase: GetContextUseCase,
        private createContextUseCase: CreateContextUseCase,
        private getReplyContextUseCase: GetReplyContextUseCase,
        private fullfillContextUseCase: FullfillContextUseCase,
    ) {}

    async fullfillContext(context: Context, value: string): Promise<FullfillValue | undefined> {
        return await this.fullfillContextUseCase.execute(context, value)
    }

    async getContext(userId: string, value: string): Promise<Context | undefined> {
        const context = await this.getContextUseCase.execute(userId)
        if (context) {
            return context
        }

        try {
            return await this.createContextUseCase.execute(userId, value)
        } catch (e) {
            if (e instanceof ActionNotFoundException) {
                return undefined
            }
        }

        return undefined
    }

    async getReplyContext(userId: string, value: string): Promise<Reply | undefined> {
        return await this.getReplyContextUseCase.execute(userId, value)
    }
}

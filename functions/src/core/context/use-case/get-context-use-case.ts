import {injectable} from 'tsyringe'
import {ContextRepo} from '../repo/context-repo'
import {Context} from '../query/context'

@injectable()
export class GetContextUseCase {
    constructor(
        private repo: ContextRepo,
    ) {}

    async execute(userId: string): Promise<Context | undefined> {
        const context = await this.repo.getDocData(userId)
        if (context) {
            return context
        }

        return undefined
    }
}

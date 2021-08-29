import {injectable} from 'tsyringe'
import {ContextRepo} from '../repo/context-repo'
import {Context} from '../query/context'

@injectable()
export class CreateContextUseCase {
    constructor(
        private repo: ContextRepo,
    ) {}

    async execute(userId: string, message: string): Promise<Context> {
        const context = Context.create(userId, message)
        console.log(context.toJSON())
        await this.repo.setDoc(context)

        return context
    }
}

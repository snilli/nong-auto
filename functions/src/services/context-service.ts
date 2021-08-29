import {injectable} from 'tsyringe'
import {GetContextUseCase} from '../core/context/use-case/get-context-use-case'
import {CreateContextUseCase} from '../core/context/use-case/create-context-use-case'
import {Context} from '../core/context/query/context'

@injectable()
export class ContextService {
    constructor(
        private getContextUseCase: GetContextUseCase,
        private createContextUseCase: CreateContextUseCase,
    ) {}

    async createContext(userId: string, message: string): Promise<Context> {
        return await this.createContextUseCase.execute(userId, message)
    }

    async getContext(userId: string): Promise<Context | undefined> {
        return await this.getContextUseCase.execute(userId)
    }
}

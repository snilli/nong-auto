import {ActionDetail, Reply} from '../../core/context/query/action-info.interface'
import {injectable} from 'tsyringe'
import {ImageService} from '../image-service'

export interface GenPdfData {
    name: string
    messageIds: string[]
}

@injectable()
export class GenPdfActionParser {
    constructor(
        private imageService: ImageService,
    ) {}

    async execute(actionName: string, actions: ActionDetail[], userId: string): Promise<Reply> {
        const data = this.getData(actionName, actions)
        const url = await this.imageService.genPdf(data.name, data.messageIds, userId)

        return {
            type: 'text',
            text: url,
        }
    }

    getData(actionName: string, actions: ActionDetail[]): GenPdfData {
        const data: GenPdfData = {
            name: actions[0].value as string,
            messageIds: [],
        }
        for (let i = 1; i < 7; i++) {
            const value = actions[i].value
            if (value) {
                data.messageIds.push(value)
            }
        }

        return data
    }
}

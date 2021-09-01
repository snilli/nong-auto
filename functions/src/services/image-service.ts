import {injectable} from 'tsyringe'
import {Client} from '@line/bot-sdk'
import {Readable} from 'stream'
import {imageToPdf} from '../common/image-to-pdf'
import {deleteTempFile, readableToBuffer} from '../common/file'
import {FirebaseStorage} from '../common/firebase-storage'

@injectable()
export class ImageService {
    constructor(
        private client: Client,
        private storage: FirebaseStorage,
    ) {}

    genLineMediaUrl(messageId: string): string {
        return `https://api-data.line.me/v2/bot/message/${messageId}/content`
    }

    async getContent(messageId: string): Promise<Readable> {
        return await this.client.getMessageContent(messageId)
    }

    async genPdf(name: string, messageIds: string[], userId: string): Promise<string> {
        const filename = `${name}.pdf`
        const buffers: Buffer[] = []
        for (const messageId of messageIds) {
            const stream = await this.getContent(messageId)
            buffers.push(await readableToBuffer(stream))
        }

        await imageToPdf(filename, buffers, 'A4')

        const url = await this.storage.uploadFile(filename, userId)
        deleteTempFile(filename)

        return url
    }
}

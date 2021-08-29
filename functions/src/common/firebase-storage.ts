import {container} from 'tsyringe'
import {FirebaeClient} from './firebase-client'
import {Bucket} from '@google-cloud/storage'

export class FirebaseStorage {
    private bucket: Bucket

    constructor() {
        const client = container.resolve(FirebaeClient)
        this.bucket = client.storage().bucket()
    }

    async uploadFile(path: string): Promise<void> {
        await this.bucket.upload(path)
    }

    async saveFile(path: string, file: Buffer): Promise<void> {
        await this.bucket.file(path).save(file)
    }
}

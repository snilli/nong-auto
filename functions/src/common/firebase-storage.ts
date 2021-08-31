import {container} from 'tsyringe'
import {FirebaeClient} from './firebase-client'
import {Bucket} from '@google-cloud/storage'
import {File} from '@google-cloud/storage/build/src/file'
import {tempFile} from './file'
import {v4 as uuidv4} from 'uuid'

export class FirebaseStorage {
    private bucket: Bucket

    constructor() {
        const client = container.resolve(FirebaeClient)
        this.bucket = client.storage().bucket()
    }

    async uploadFile(name: string): Promise<string> {
        const uuid = uuidv4()
        const path = tempFile(name)
        const [file] = await this.bucket.upload(path, {
            // กำหนด path ในการเก็บไฟล์แยกเป็นแต่ละ userId
            destination: `photos/user/${name}`,
            metadata: {
                cacheControl: 'no-cache',
                metadata: {
                    firebaseStorageDownloadTokens: uuid,
                },
            },
        })

        const prefix = `https://firebasestorage.googleapis.com/b/${this.bucket.name}/o`
        const suffix = `alt=media&token=${uuid}`

        return `${prefix}/${encodeURIComponent(file[0].name)}?${suffix}`
    }

    async saveFile(path: string, file: Buffer): Promise<File> {
        const bucketFile = this.bucket.file(path)
        await bucketFile.save(file)

        return bucketFile
    }
}

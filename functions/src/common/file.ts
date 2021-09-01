import path from 'path'
import fs, {WriteStream} from 'fs'
import os from 'os'
import {Readable} from 'stream'

const tempPath = os.tmpdir()

export const createTempWriteStream = (name: string): WriteStream => {
    return fs.createWriteStream(tempFile(name))
}

export const deleteTempFile = (filename: string): void => {
    fs.unlinkSync(tempFile(filename))
}

export const tempFile = (name: string): string => {
    return path.join(tempPath, name)
}

export const readableToBuffer = (readable: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const buffers: Uint8Array[] = []
        readable.on('data', (data) => {
            buffers.push(data)
        })
        readable.on('end', () => {
            resolve(Buffer.concat(buffers))
        })
        readable.on('error', reject)
    })
}

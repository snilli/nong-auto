import path from 'path'
import fs, {WriteStream} from 'fs'
import os from 'os'

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

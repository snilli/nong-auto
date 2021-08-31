import PDFDocument from 'pdfkit'
import paperSizes from './paper-size.json'
import {createTempWriteStream} from '../file'
import {Readable} from 'stream'

export const imageToPdf = async (
    name: string,
    images: (Buffer | Readable | string)[],
    size: string,
): Promise<void> => {
    const doc = new PDFDocument({margin: 0, size})
    for (const [i, image] of images.entries()) {
        doc.image(image, 0, 0, {fit: paperSizes[size], align: 'center', valign: 'center'})

        if (images.length != i + 1) doc.addPage()
    }
    doc.end()
    doc.pipe(createTempWriteStream(name))
    await syncPipeline(doc)

    return undefined
}

// const streamToBuffer = (doc: PDFKit.PDFDocument): Promise<Buffer> => {
//     return new Promise((resolve, reject) => {
//         const buffers: Uint8Array[] = []
//         doc.on('error', reject)
//         doc.on('data', (data) => buffers.push(data))
//         doc.on('end', () => resolve(Buffer.concat(buffers)))
//     })
// }

const syncPipeline = (doc: PDFKit.PDFDocument): Promise<void> => {
    return new Promise((resolve, reject) => {
        doc.on('error', reject)
        doc.on('end', resolve)
    })
}

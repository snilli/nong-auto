import path from 'path'
import {v4 as uuidv4} from 'uuid'
import {imageToPdf} from '../common/image-to-pdf'
import admin, {ServiceAccount} from 'firebase-admin'
import serviceAccount from './nong-auto-firebase-adminsdk.json'
import {deleteTempFile, tempFile} from '../common/file'
// const pages = [
//     path.resolve(__dirname, '1.png'),
//     path.resolve(__dirname, '2.png'),
//     path.resolve(__dirname, '3.png'),
// ]
console.log(path.resolve(__dirname, '1.png'))
console.log(path.join(__dirname, '1.png'))
const name = 'mee.pdf'
imageToPdf(name, ['https://api-data.line.me/v2/bot/message/14665865467012/content'], 'A4')
    .then(async () => {

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount as ServiceAccount),
                storageBucket: 'nong-auto.appspot.com',
            })
            const uuid = uuidv4()
            const bucket = admin.storage().bucket()
            const res = await bucket.upload(
                tempFile(name),
                {
                    // กำหนด path ในการเก็บไฟล์แยกเป็นแต่ละ userId
                    destination: `photos/user/${name}`,
                    metadata: {
                        cacheControl: 'no-cache',
                        metadata: {
                            firebaseStorageDownloadTokens: uuid,
                        },
                    },
                },
            )
            deleteTempFile(name)
            const prefix = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o`
            const suffix = `alt=media&token=${uuid}`
            const resfile = `${prefix}/${encodeURIComponent(res[0].name)}?${suffix}`
            console.log(resfile)
        },
    )
    .catch(console.log)
    .finally(console.log)

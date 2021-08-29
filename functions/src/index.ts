import 'reflect-metadata'
import * as functions from 'firebase-functions'
import {LineBot} from './line-bot'

export const nongAuto = functions.https.onRequest((req, res) => {
    const signature = req.headers['x-line-signature'] as string
    const webhookEvents = LineBot.validateSignature(JSON.stringify(req.body), signature)
    if (webhookEvents) {
        new LineBot()
            .run(webhookEvents.events)
            .then()
            .catch((e) => functions.logger.error(e))
        res.send('ok')
    } else {
        res.status(400).send('Invalid request')
    }
})

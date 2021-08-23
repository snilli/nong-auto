import * as functions from 'firebase-functions'
import {Config} from './interfaces/config-parser.interface'

export class ConfigParser {
    static get(): Config {
        const config = functions.config()

        return {
            channelAccessToken: config['nong_auto']['channel_access_token'],
            channelSecret: config['nong_auto']['channel_secret'],
        }
    }
}

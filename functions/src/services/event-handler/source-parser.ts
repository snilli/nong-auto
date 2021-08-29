import {EventSource} from '@line/bot-sdk/lib/types'

export class SourceParser {
    static getSourceId(source: EventSource): string {
        switch (source.type) {
            case 'group':
                return source.groupId
            case 'room':
                return source.roomId
            case 'user':
                return source.userId
        }
    }

    static getUserId(source: EventSource): string | undefined {
        switch (source.type) {
            case 'group':
                return source.userId
            case 'room':
                return source.userId
            case 'user':
                return source.userId
        }
    }
}

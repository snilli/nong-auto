import {inspect} from 'util'

export const logger = (obj: unknown): string => {
    return inspect(obj, {showHidden: false, depth: null})
}

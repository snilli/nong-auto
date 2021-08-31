import admin from 'firebase-admin'
import 'firebase-functions'
import {injectable} from 'tsyringe'

@injectable()
export class FirebaeClient {
    private readonly app: admin.app.App

    constructor() {
        if (admin.apps.length && admin.apps[0]) {
            this.app = admin.apps[0]
            admin.apps[0]?.delete()
        }

        this.app = admin.initializeApp()

    }

    firestore(): FirebaseFirestore.Firestore {
        const firestore = this.app.firestore()
        firestore.settings({
            ignoreUndefinedProperties: true,
        })

        return firestore
    }

    storage(): admin.storage.Storage {
        return this.app.storage()
    }
}

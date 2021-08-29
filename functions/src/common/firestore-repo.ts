import {container} from 'tsyringe'
import {FirebaeClient} from './firebase-client'
import {Query} from './query'

export type CollectionReference<T> = FirebaseFirestore.CollectionReference<T>
export type DocumentReference<T> = FirebaseFirestore.DocumentReference<T>
export type FirestoreRepoCreateFactory<T> = (payload: any) => T

export interface FirestoreOption<T> {
    createFactory: FirestoreRepoCreateFactory<T>
    collection: string
}

export class FirestoreRepo<T extends Query<any>> {
    protected db: FirebaseFirestore.Firestore
    protected collection: string
    protected createFactory: FirestoreRepoCreateFactory<T>

    constructor(option: FirestoreOption<T>) {
        const client = container.resolve(FirebaeClient)
        this.db = client.firestore()
        this.createFactory = option.createFactory
        this.collection = option.collection
    }

    async setDoc(document: T): Promise<void> {
        const id = document.getId()
        const collection = this.getCollectionRef()

        const data = document.toJSON()

        await collection.doc(id).set(data)
    }

    async updateDoc(document: T): Promise<void> {
        const id = document.getId()
        const docRef = this.getDocRef(id)

        if (!docRef) {
            return
        }

        await docRef.update(document.toJSON())
    }

    async deleteDoc(id: string): Promise<void> {
        const docRef = this.getDocRef(id)

        if (!docRef) {
            return
        }

        await docRef.delete()
    }

    getCollectionRef(): CollectionReference<any> {
        return this
            .db
            .collection(this.collection) as CollectionReference<any>
    }

    getDocRef(id: string): DocumentReference<T> | undefined {
        const collection = this.getCollectionRef()
        const doc = collection.doc(id)
        if (!doc) {
            return
        }

        return doc
    }

    async getDocData(id: string): Promise<T | undefined> {
        const collection = this.getCollectionRef()
        const doc = collection.doc(id)
        const docSnap = await doc.get()

        if (!docSnap.exists) {
            return
        }

        return this.createFactory(docSnap.data())
    }

    async getCollectionData(): Promise<Map<string, T> | undefined> {
        const collectionRef = this.getCollectionRef()
        if (!collectionRef) {
            return
        }

        const dataMap: Map<string, T> = new Map<string, T>()
        const collection = await collectionRef.get()

        collection.forEach((doc) => {
            dataMap.set(doc.id, this.createFactory(doc.data()))
        })

        if (!collection.size) {
            return
        }

        return dataMap
    }

}

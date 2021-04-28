import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  /**
   * Add document to Firebase collection
   * @param objectX Object to add
   * @param nameCollection Name of Collection in firebase
   * @returns promise with the answer of firebase
   */
  addGeneric(objectX: any, nameCollection: string): Promise<any> {
    return this.firestore.collection(nameCollection).add(objectX);
  }

  /**
   * Update data of a document in a collection in firebase
   * @param id id of document in firebase
   * @param data data to update
   * @param nameCollection name of collection in firebase
   * @returns promise with the answer of firebase
   */
  updateGeneric(id: string, data: any, nameCollection: string) {
    return this.firestore.collection(nameCollection).doc(id).update(data);
  }

  /**
   * Delete document in a collection in firebase
   * @param id id of document in firebase
   * @param nameCollection name of collection in firebase
   * @returns promise with the answer of firebase
   */
  deleteGeneric(id: string, nameCollection: string) {
    return this.firestore.collection(nameCollection).doc(id).delete();
  }
}

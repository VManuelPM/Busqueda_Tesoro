import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  addGeneric(objectX: any, nameCollection: string): Promise<any> {
    return this.firestore.collection(nameCollection).add(objectX);
  }

  updateGeneric(id: string, data: any, nameCollection: string) {
    return this.firestore.collection(nameCollection).doc(id).update(data);
  }

  deleteGeneric(id: string, nameCollection: string) {
    return this.firestore.collection(nameCollection).doc(id).delete();
  }
}

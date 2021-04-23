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
}

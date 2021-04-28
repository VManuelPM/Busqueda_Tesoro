import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user: User;

  constructor(private db: AngularFirestore) {}

  /**
   * Get user By id from collection users in firebase
   * @param idUser
   * @returns Observable with the user
   */
  getUserById(idUser: string) {
    return this.db.collection<User>('users').doc(idUser).valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: User;

  constructor(private db: AngularFirestore) { }

  getUserById(idUser: string){
    return this.db.collection('users').doc(idUser).valueChanges();
  }
}

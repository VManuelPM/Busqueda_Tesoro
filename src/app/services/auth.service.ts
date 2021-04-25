import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error -> ', error);
    }
  }

  /**
   * Login to App
   * @param email
   * @param password
   * @returns user from auth firebase
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error -> ', error);
    }
  }

  /**
   * Update Info of user
   * @param user User to update
   * @returns User
   */
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }

  /**
   * Get Current user
   * @returns Promise with the user
   */
  async getCurrentuser() {
    return this.afAuth.currentUser;
  }

  /**
   * Detect changes in autentication
   * @returns Observable
   */
  getAuthState() {
    return this.afAuth.authState;
  }
}

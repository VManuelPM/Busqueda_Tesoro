import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from './storage.service';
import { Game } from '../models/game';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  url: string;

  constructor(
    private storageService: StorageService,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  /**
   * Save photo in storage
   * @param imageUpload image to upload to storage
   * @returns url of object in storage
   */
  savePhotoFirebase(uid: string, imageBase64: string, srcImage?: string) {
    let date = new Date();
    if (imageBase64) {
      //Assing id photo
      let idPhoto =
        uid + date.getHours() + date.getMinutes() + date.getSeconds();
      return this.storageService.uploadFile(idPhoto, imageBase64);
    }
  }

  getGamesByUserId(userId) {
    return this.db
      .collection<Game>('games', (ref) => ref.where('uid', '==', userId))
      .valueChanges({ idField: 'customIdName' });
  }

  getGameByGameId(gameId) {
    return this.db.collection<Game>('games').doc(gameId).valueChanges();
  }
}

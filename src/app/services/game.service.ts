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

  getAllGames() {
    return this.db
      .collection<Game>('games')
      .valueChanges({ idField: 'customIdName' });
  }

  /**
   * Get Games except games where user is owner
   * @param userId id of user
   * @returns promise with games
   */
  getGames(userId) {
    return this.db
      .collection<Game>('games', (ref) => ref.where('uid', '!=', userId))
      .valueChanges({ idField: 'customIdName' });
  }

  /**
   * Get Games By User ID only Admin
   * @param userId Id of User
   * @returns promise with Games where user is owner
   */
  getGamesByUserId(userId) {
    return this.db
      .collection<Game>('games', (ref) => ref.where('uid', '==', userId))
      .valueChanges({ idField: 'customIdName' });
  }

  /**
   * Get game by Id Game
   * @param gameId Id of Game
   * @returns Promise with the Game
   */
  getGameByGameId(gameId) {
    return this.db.collection<Game>('games').doc(gameId).valueChanges();
  }
}

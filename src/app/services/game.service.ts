import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  url: string;

  constructor(private storageService: StorageService) {}

  /**
   * Save photo in storage
   * @param imageUpload image to upload to storage
   * @returns url of object in storage
   */
  savePhotoFirebase(uid: string, imageBase64: string) {
    let date = new Date();
    if (imageBase64) {
      //Assing id photo
      let idPhoto =
        uid + date.getHours() + date.getMinutes() + date.getSeconds();
      return this.storageService.uploadFile(idPhoto, imageBase64);
    }
  }
}

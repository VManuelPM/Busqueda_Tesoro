import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  async uploadFile(id, photo): Promise<any> {
    if (photo) {
      try {
        const task = await this.storage
          .ref('images')
          .child(id)
          .putString(photo, 'data_url');
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log('error uploading storage -> ', error);
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  /**
   * Upload file to storage
   * @param id id of object in storage
   * @param photo file in storage
   * @returns String with Download url of file
   */
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

  /**
   * Get Image by Download URL
   * @param urlImage Download url
   * @returns promise with the image
   */
  getImage(urlImage: string) {
    try {
      return this.storage.refFromURL(urlImage).getDownloadURL().toPromise();
    } catch (error) {
      console.log('error getting images storage -> ', error);
    }
  }

  /**
   * Delete Image in storage By Download Url
   * @param urlImage Download URL
   * @returns promise with the answer of storage
   */
  deleteImage(urlImage: string) {
    try {
      return this.storage.refFromURL(urlImage).delete().toPromise();
    } catch (error) {
      console.log('error getting images storage -> ', error);
    }
  }
}

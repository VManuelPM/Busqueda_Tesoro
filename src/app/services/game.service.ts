import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  imageBase64: string;
  url: string;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private imageService: ImageService
  ) {}

  savePhotoFirebase(imageUpload) {
    let date = new Date();
    let uid: string;
    let url: string;

    //Call current user
    this.authService.getCurrentuser().then(async (user) => {
      uid = user.uid;
      //Assing id photo
      let idPhoto =
        uid + date.getHours() + date.getMinutes() + date.getSeconds();
      //Convert to Base64
      this.imageService.readAsBase64(imageUpload).then(async (base64) => {
        this.imageBase64 = base64;
        this.storageService
          .uploadFile(idPhoto, this.imageBase64)
          .then((res) => {
            console.log(res);
            url = res;
          });
      });
    });
    return url;
  }
}

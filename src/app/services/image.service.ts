import { Injectable } from '@angular/core';
import { CameraPhoto } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  /**
   * Convert a photo to base64
   * @param cameraPhoto photo of type CameraPhoto
   * @returns string with photo transformed to base64
   */
  public async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  /**
   * Convert blob to base64
   * @param blob blob to convert
   * @returns blot in base64
   */
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

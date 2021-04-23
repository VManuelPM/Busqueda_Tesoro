import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async presentToast(textToast: string) {
    const toast = await this.toastController.create({
      message: textToast,
      duration: 2000,
    });
    toast.present();
  }
}

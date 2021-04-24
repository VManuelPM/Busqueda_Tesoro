import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    public toastController: ToastController,
    private alertController: AlertController
  ) {}

  async presentToast(textToast: string) {
    const toast = await this.toastController.create({
      message: textToast,
      duration: 2000,
    });
    toast.present();
  }

  async presentAlertConfirm(
    titleAlert: string,
    messageAlert: string
  ): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: titleAlert,
        message: `<strong>${messageAlert}</strong>!!!`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              console.log('Confirm Cancel');
              resolve('cancel');
            },
          },
          {
            text: 'Okay',
            handler: (ok) => {
              console.log('Confirm Okay');
              resolve('ok');
            },
          },
        ],
      });
      alert.present();
    });
  }
}

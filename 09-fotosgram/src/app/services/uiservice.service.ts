import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

  constructor(public alertController: AlertController) {}

  async AlertaInformativa(message: string ) {
    const alert = await this.alertController.create({

      message,
      buttons: ['OK']
    });

    await alert.present();
  }


}

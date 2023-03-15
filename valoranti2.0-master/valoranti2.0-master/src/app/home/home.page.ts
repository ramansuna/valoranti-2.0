import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public toastController: ToastController){

   }
   async openToast(){
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
      position:'middle',
      color: 'success',

    });
    toast.present();
    toast.onDidDismiss().then((value) => {
      console.log('toast dimissed');
    });
   }

  ngOnInit() {
    console.log()
  }

}

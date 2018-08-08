import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';
import { ViewdataPage } from '../viewdata/viewdata';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Username
  Password
  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  Sigin(){
   this.navCtrl.push(ViewdataPage);
   }
  





  SigUp(){
    this.navCtrl.push(RegisterPage);
  }
}

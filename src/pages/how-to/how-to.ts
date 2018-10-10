import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DisclaimerPage } from '../disclaimer/disclaimer';



@Component({
  selector: 'page-how-to',
  templateUrl: 'how-to.html',
})

export class HowToPage {

	disclaimerPage = DisclaimerPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


 onGoToDisclaimer(page: any){
 	this.navCtrl.push(this.disclaimerPage);
 }

}

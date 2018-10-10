import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { ScanResultPage } from '../pages/scan-result/scan-result';
import { TabsPage } from '../pages/tabs/tabs';
import { HowToPage } from '../pages/how-to/how-to';

import { ItemsService } from '../services/items.service';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    DisclaimerPage,
    ScanResultPage,
    TabsPage,
    HowToPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    DisclaimerPage,
    ScanResultPage,
    TabsPage,
    HowToPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItemsService,
    Camera
  ]
})
export class AppModule {}

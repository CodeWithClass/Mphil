import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { RoundProgressModule } from 'angular-svg-round-progressbar'; 
import {ChartsModule} from 'ng2-charts';


import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { FoodPage } from '../pages/food/food';
import { AddFoodPage } from '../pages/addfood/addfood';
import { MyStatsPage } from '../pages/mystats/mystats';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SettingsPage,
    FoodPage,
    AddFoodPage,
    MyStatsPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    RoundProgressModule, 
    ChartsModule,    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SettingsPage,
    FoodPage,
    AddFoodPage,
    MyStatsPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {


}

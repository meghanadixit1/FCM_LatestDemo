import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private fcm:FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log("getToken before");
      this.fcm.getToken().then(token => {
        // backend.registerToken(token);
        console.log("getToken",token);
       });
      console.log("requestPushPermission before");

      this.fcm.requestPushPermission().then(res=>{
        console.log("requestPushPermission res",res);
      })
      console.log("requestPushPermission after");
      
      
      this.fcm.onNotification().subscribe(data => {
        console.log("Received Notification",JSON.stringify(data));
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });
      
      this.fcm.onTokenRefresh().subscribe(token => {
        //backend.registerToken(token);
        console.log("tokenRefresh",token);
      });
      
    });
  }
}


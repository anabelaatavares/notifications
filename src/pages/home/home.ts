import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Dialogs } from '@ionic-native/dialogs';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notifa: any[];

  MINUTE = "minute";
  repeticaoAgua: number;
  coiso: boolean;

  constructor(public navCtrl: NavController, public platform: Platform, public localNotifications: LocalNotifications,
    public dialogs: Dialogs, public vibration: Vibration) {

    this.notifi();
  }

  notifi() {
    //this.notifa = [];
    this.platform.ready().then(() => {
      console.log(this.coiso);

      /*this.notifa.push({
        id: 1,
        title: 'Test',
        text: 'test1',
        trigger: { every: 30, unit: 'minute', count: 120, firstAt: new Date(new Date().getTime() + 3600), , unit: ELocalNotificationTriggerUnit.MINUTE, every: 30  },
        actions: [
          { id: 'tomar', title: 'Tomar' },
          { id: 'adiar', title: 'Adiar' }
        ]
      });
*/

      let notifa = {
        text: 'Delayed ILocalNotification',
        trigger: {
          at: new Date(new Date().getTime())
        },
        led: 'FF0000',
        sound: null,
        actions: [
          { id: 'tomar', title: 'Tomar' },
          { id: 'adiar', title: 'Adiar' }
        ]
      };


      this.localNotifications.requestPermission().then((permission) => {

        this.localNotifications.schedule(notifa);

        this.repeticaoAgua = setInterval(function () {
          this.dialogs.beep(1);
          this.vibration.vibrate(1000);
        }.bind(this), (60000));

      });


      let onclickTomar = this.localNotifications.on("tomar");
      onclickTomar.subscribe((notification) => {
        this.localNotifications.cancel(notification.id);
        clearInterval(this.repeticaoAgua);
        console.log(notification.id);
      });

      console.log(JSON.stringify(notifa));
    });



  }

}

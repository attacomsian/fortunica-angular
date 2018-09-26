import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {SwPush} from '@angular/service-worker';


@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = 'BKP4IiaKomoSzZ2h0jzUFk67ygRLxgqsdTRBYXIKE61pbDymt28XUHGSYsoHNNyAr0NKARbEt2xbFM35hErNFvc';
  name = '';

  constructor(private router: Router,
              private authService: AuthService,
              private swPush: SwPush,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.name = this.authService.getUserName();
    // push notification subscription
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          this.authService.addPushNotification(JSON.stringify(sub), this.authService.getUserType()).subscribe();
        })
        .catch(err => console.error('Could not subscribe to notifications', err));
    }
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('Logout successfully.', 'Success');
    this.router.navigate(['/']);
  }
}

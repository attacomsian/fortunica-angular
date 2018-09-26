import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit() {
    // load new version of PWA if available
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}

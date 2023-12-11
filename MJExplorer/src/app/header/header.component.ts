import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Metadata } from '@memberjunction/core';
import { MJAuthBase } from '@memberjunction/ng-auth-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor (public router: Router, public authBase: MJAuthBase) {}
  public goToHome() {
    this.router.navigate(['/']);
  }

  public doLogOut() {
    // wipe out the metadata in the local storage
    const md = new Metadata();
    md.RemoveLocalMetadataFromStorage();
    this.authBase.logout();
  }
}

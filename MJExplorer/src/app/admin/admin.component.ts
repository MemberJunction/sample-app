import { Component } from '@angular/core';
import { Metadata } from '@memberjunction/core';
import { MJAuthBase } from '@memberjunction/ng-auth-services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(public authBase: MJAuthBase){}

  public doLogOut() {
    const md = new Metadata();
    md.RemoveLocalMetadataFromStorage();
    this.authBase.logout();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Metadata } from '@memberjunction/core';
import { MJAuthBase } from '@memberjunction/ng-auth-services';
import { CartService } from '../utils/cart.service';
import { SharedService } from '../utils/shared-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public cartItems: number = 0;
  public isAdmin: boolean = false;
  
  constructor(public router: Router, public authBase: MJAuthBase, private sharedService: SharedService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items.length;
    });
    this.sharedService.setupComplete$.subscribe(setupComplete => {
      if (setupComplete) {
        this.loadData();
      }
    });
  }

  public goToHome() {
    this.router.navigate(['/']);
  }

  public doLogOut() {
    // wipe out the metadata in the local storage
    const md = new Metadata();
    md.RemoveLocalMetadataFromStorage();
    this.authBase.logout();
  }

  loadData(){
    const md = new Metadata();
    const admin = md.CurrentUser.UserRoles.findIndex((role) => role.RoleName === 'Developer');
    if (admin !== -1) this.isAdmin = true;
  }
}

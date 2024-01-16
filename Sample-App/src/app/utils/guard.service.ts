import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MJAuthBase } from '@memberjunction/ng-auth-services';
@Injectable({
    providedIn: "root",
 })
 export class AuthGuard implements CanActivate {
  constructor(public authBase: MJAuthBase) {}
  canActivate(): boolean {
    if (!this.authBase.authenticated) {
      return false;
    }
    return true;
  }
}
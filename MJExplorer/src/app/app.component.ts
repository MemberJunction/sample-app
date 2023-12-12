import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LogError, LogStatus, Metadata, RunView, SetProductionStatus } from '@memberjunction/core';
import { setupGraphQLClient, GraphQLProviderConfigData } from '@memberjunction/graphql-dataprovider';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { LoadGeneratedEntities } from 'mj_generatedentities'
import { MJAuthBase } from '@memberjunction/ng-auth-services';
import { SharedService } from './utils/shared-service';
LoadGeneratedEntities(); // forces the generated entities library to load up, sometimes tree shaking in the build process can break this, so this is a workaround that ensures it always happens

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title = 'MJ Explorer';
  public initalPath = '/';
  public HasError = false;
  public ErrorMessage: any = '';
  public environment = environment;

  constructor(@Inject(DOCUMENT) public document: Document, public authBase: MJAuthBase, private sharedService: SharedService) { }

  public doSignUp() {
    this.authBase.login({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }

  async handleLogin(token: string, claims: any) {
    if (token) {
      const url: string = environment.GRAPHQL_URI;
      const wsurl: string = environment.GRAPHQL_WS_URI;

      try {
        const start = Date.now();        
        const config = new GraphQLProviderConfigData(token, url, wsurl, environment.MJ_CORE_SCHEMA_NAME);
        await setupGraphQLClient(config);
        const end = Date.now();
        LogStatus(`GraphQL Client Setup took ${end - start}ms`);

        // Check to see if the user has access... 
        const md = new Metadata();
        if (!md.CurrentUser) {
          // if user doens't have access do this stuff
          this.HasError = true;
          this.ErrorMessage = `You don't have access to the application, contact your system administrator.`
          throw this.ErrorMessage;
        } else {
          const setupStart = new Date();
          await this.sharedService.doSetup();
          const setupEnd = new Date();
          const setupElapsed = (setupEnd.getTime() - setupStart.getTime()) / 1000;
          console.log(`setupService.doSetup() took ${setupElapsed} seconds`);
        }
        localStorage.removeItem('jwt-retry-ts');
      } catch (err) {
        const retryKey = 'auth-retry-dt';
        const lastRetryDateTime = localStorage.getItem(retryKey);
        const yesterday = +new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);

        const retriedRecently = lastRetryDateTime && +new Date(lastRetryDateTime) > yesterday;
        const expiryError = this.authBase.checkExpiredTokenError((err as any)?.response?.errors?.[0]?.message);

        if (!retriedRecently && expiryError) {
          LogStatus('JWT Expired, retrying once: ' + err);
          localStorage.setItem(retryKey, new Date().toISOString());
          const login$ = this.authBase.login({ appState: { target: window.location.pathname } });
          await lastValueFrom(login$);
        } else {
          this.HasError = true;
          this.ErrorMessage = err;
          LogError('Error Logging In: ' + err);
          throw err;
        }
      }
    }
  }

  async setupAuth() {
    this.authBase.getUserClaims().subscribe((claims: any) => {
      if (claims) {
        const token = environment.AUTH_TYPE === 'auth0' ? claims?.__raw : claims?.idToken;
        const result = claims.idTokenClaims ? 
                        {...claims, ...claims.idTokenClaims} : // combine the values from the two claims objects because in auth0 and MSAL they have different structures, this pushes them all together into one
                        claims; // or if idTokenClaims doesn't exist, just use the claims object as is

        this.handleLogin(token, result); 
      }
    }, (err: any) => {
      LogError('Error Logging In: ' + err);
    });
  
    this.authBase.isAuthenticated()
      .pipe(take(1)) /* only do this for the first message */
      .subscribe((loggedIn: any) => {
        if (!loggedIn) {
          this.authBase.login(); 
        }
      });  

    this.initalPath = window.location.pathname + (window.location.search ? window.location.search : '');
  }

  ngOnInit() {
    SetProductionStatus(environment.production)
    this.setupAuth();
  }

}

// Angular stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'

// MJ Stuff
import { ExplorerCoreModule } from '@memberjunction/ng-explorer-core';
import { MJAuthBase, MJAuth0Provider, MJMSALProvider } from '@memberjunction/ng-auth-services';
import { UserViewGridModule } from '@memberjunction/ng-user-view-grid';
import { LinkDirectivesModule } from '@memberjunction/ng-link-directives';
import { ContainerDirectivesModule } from '@memberjunction/ng-container-directives';

import { SharedService, LoadResourceWrappers } from '@memberjunction/ng-explorer-core';

// Kendo
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { IconsModule } from '@progress/kendo-angular-icons';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { SortableModule } from "@progress/kendo-angular-sortable";
import { FilterModule } from "@progress/kendo-angular-filter";
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { NotificationModule } from "@progress/kendo-angular-notification";
import { ListViewModule } from '@progress/kendo-angular-listview';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ListBoxModule } from '@progress/kendo-angular-listbox';

// Auth0
import { AuthModule, AuthService } from '@auth0/auth0-angular';

//MSAL
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

 

// Routing
import { AppRoutingModule } from './app-routing.module';

// Project stuff
import { AppComponent } from './app.component';
import { GeneratedFormsModule } from './generated/generated-forms.module';
import { environment } from 'src/environments/environment';
import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategorySelectComponent } from './category-select/category-select.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { CategoryComponent } from './category/category.component';
import { TopicComponent } from './topic/topic.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AdminModule } from './admin/admin.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleOrderComponent } from './profile/single-order/single-order.component';

LoadResourceWrappers();

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategorySelectComponent,
    SearchBookComponent,
    CategoryComponent,
    TopicComponent,
    BookDetailComponent,
    CartComponent,
    ProfileComponent,
    SingleOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    IndicatorsModule,
    IconsModule,
    InputsModule,
    DateInputsModule,
    NavigationModule,
    ButtonsModule,
    GridModule,
    DropDownsModule,
    LabelModule,
    AppRoutingModule,
    ListViewModule,
    DialogsModule,
    SortableModule,
    FilterModule,
    UserViewGridModule,
    LinkDirectivesModule,
    ContainerDirectivesModule,
    ExplorerCoreModule,
    GeneratedFormsModule,
    NotificationModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Auth0 --- Import the module into the application, with configuration, IF YOU ARE USING Auth0
    // AuthModule.forRoot({
    //   domain: environment.AUTH0_DOMAIN,
    //   clientId: environment.AUTH0_CLIENTID,
    //   authorizationParams: {
    //     redirect_uri: window.location.origin
    //   },
    //   cacheLocation: 'localstorage',
    // }),
    // MsalModule
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: environment.CLIENT_ID, // This is your client ID
        authority: environment.CLIENT_AUTHORITY, // This is your tenant info
        redirectUri: window.location.origin
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false, // set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['User.Read']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    }),
    ChartsModule,
    ListBoxModule,
    AdminModule
  ],
  providers: [SharedService,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    { provide: MJAuthBase, useClass: environment.AUTH_TYPE === 'auth0' ? MJAuth0Provider : MJMSALProvider },],
  bootstrap: [AppComponent, MsalRedirectComponent],
  exports: [SingleOrderComponent]
})
export class AppModule { }

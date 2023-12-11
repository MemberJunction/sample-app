import {Injectable, NgModule} from '@angular/core';
import {
  Routes,
  RouterModule,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { SingleApplicationComponent, SingleEntityComponent, SingleRecordComponent, HomeComponent, ResourceData, 
         UserNotificationsComponent, SettingsComponent, DataBrowserComponent, ReportBrowserComponent, 
         DashboardBrowserComponent, EventCodes, SharedService, AskSkipComponent,
         checkUserEntityPermissions, AuthGuardService as AuthGuard } from "@memberjunction/ng-explorer-core";
import { LogError} from "@memberjunction/core";
import { MJEventType, MJGlobal } from '@memberjunction/global';



@Injectable({
  providedIn: 'root',
})
export class ResourceResolver implements Resolve<void> {
  constructor(private sharedService: SharedService) {}  

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    let resourceType = route.params['resourceType'];
    const resourceRecordId = route.params['resourceRecordId'];
    if (resourceType !== undefined && resourceRecordId !== undefined) {
      resourceType = this.sharedService.mapResourceTypeRouteSegmentToName(resourceType); 

      const data: ResourceData = new ResourceData( {
        Name: '',
        ResourceRecordID: resourceRecordId === null && !isNaN(resourceRecordId) ? null : parseInt(resourceRecordId),
        ResourceTypeID: this.sharedService.ResourceTypeByName(resourceType)?.ID,
        Configuration: {}
      });

      let code: EventCodes = EventCodes.AddDashboard;
      switch (resourceType.trim().toLowerCase()) {
        case 'user views':
          code = EventCodes.ViewClicked;
          break;
        case 'dashboards':
          code = EventCodes.AddDashboard;
          break;
        case 'reports':
          code = EventCodes.AddReport;
          break;
        case 'records':
          code = EventCodes.EntityRecordClicked;
          data.Configuration.Entity = route.queryParams['Entity'] || route.queryParams['entity']; // Entity or entity is specified for this resource type since resource record id isn't good enough

          if (data.Configuration.Entity === undefined || data.Configuration.Entity === null) {
            LogError('No Entity provided in the URL, must have Entity as a query parameter for this resource type');
            return; // should handle the error better - TO-DO
          }
          break;
        case 'search results':
          code = EventCodes.RunSearch;
          data.Configuration.Entity = route.queryParams['Entity'] || route.queryParams['entity'];
          data.Configuration.SearchInput = resourceRecordId;
          data.ResourceRecordID = 0; /*tell nav to create new tab*/
          break;
        default: 
          // unsupported resource type
          return; // should handle the error better - TO-DO
      }
      MJGlobal.Instance.RaiseEvent({
        component: this,
        event: MJEventType.ComponentEvent,
        eventCode: code,
        args: data
      })
    }
    else {
      // to-do - handle error
    }
  }
}




const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '**', redirectTo: 'home'
  } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


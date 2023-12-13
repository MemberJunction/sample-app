import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';
import { TopicsComponent } from './topics/topics.component';
import { AdminComponent } from './admin.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', redirectTo: 'topics', pathMatch: 'full' }, // Default child route
    { path: 'topics', component: TopicsComponent },
    { path: 'topic-detail/:topicId', component: TopicDetailComponent }
  ], }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


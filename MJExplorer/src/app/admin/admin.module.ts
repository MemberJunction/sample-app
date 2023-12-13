import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Kendo
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';


import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicsComponent } from './topics/topics.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    TopicsComponent,
    AdminComponent,
    TopicDetailComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

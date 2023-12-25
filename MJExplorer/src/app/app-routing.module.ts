import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';
// import {
//   AuthGuardService as AuthGuard
// } from "@memberjunction/ng-explorer-core";
import { HomeComponent } from './home/home.component';
import { 
  AuthGuard  
} from './utils/guard.service';
import { CategorySelectComponent } from './category-select/category-select.component';
import { CategoryComponent } from './category/category.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AdminModule } from './admin/admin.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { TopicComponent } from './topic/topic.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'trends', component: HomeComponent },
  {
    path: 'select-category',
    component: CategorySelectComponent
  },
  {
    path: 'category/:categoryId',
    component: CategoryComponent
  },
  {
    path: 'topic/:topicId',
    component: TopicComponent
  },
  {
    path: 'search-book',
    component: SearchBookComponent
  },
  {
    path: 'book-detail/:bookId',
    component: BookDetailComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**', redirectTo: 'home' 
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


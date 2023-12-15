import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Kendo
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";


import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicsComponent } from './topics/topics.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoryComponent } from './categories/sub-category/sub-category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@NgModule({
    declarations: [
        TopicsComponent,
        AdminComponent,
        TopicDetailComponent,
        CategoriesComponent,
        SubCategoryComponent,
        CategoryDetailComponent
    ],
    imports: [
        CommonModule,
        GridModule,
        IconsModule,
        DropDownsModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
    ],
    exports:[SubCategoryComponent]
})
export class AdminModule { }

import { Component } from '@angular/core';
import { BookCategoryEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadBookCategoryDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Book Categories') // Tell MemberJunction about this class
@Component({
    selector: 'gen-bookcategory-form',
    templateUrl: './bookcategory.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class BookCategoryFormComponent extends BaseFormComponent {
    public record: BookCategoryEntity | null = null;
} 

export function LoadBookCategoryFormComponent() {
    LoadBookCategoryDetailsComponent();
}

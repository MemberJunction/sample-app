import { Component } from '@angular/core';
import { BookEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadBookDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Books') // Tell MemberJunction about this class
@Component({
    selector: 'gen-book-form',
    templateUrl: './book.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class BookFormComponent extends BaseFormComponent {
    public record: BookEntity | null = null;
} 

export function LoadBookFormComponent() {
    LoadBookDetailsComponent();
}

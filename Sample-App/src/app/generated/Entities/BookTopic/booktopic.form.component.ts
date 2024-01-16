import { Component } from '@angular/core';
import { BookTopicEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadBookTopicDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Book Topics') // Tell MemberJunction about this class
@Component({
    selector: 'gen-booktopic-form',
    templateUrl: './booktopic.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class BookTopicFormComponent extends BaseFormComponent {
    public record: BookTopicEntity | null = null;
} 

export function LoadBookTopicFormComponent() {
    LoadBookTopicDetailsComponent();
}

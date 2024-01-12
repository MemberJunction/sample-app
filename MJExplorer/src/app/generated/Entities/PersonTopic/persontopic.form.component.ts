import { Component } from '@angular/core';
import { PersonTopicEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadPersonTopicDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Person Topics') // Tell MemberJunction about this class
@Component({
    selector: 'gen-persontopic-form',
    templateUrl: './persontopic.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class PersonTopicFormComponent extends BaseFormComponent {
    public record: PersonTopicEntity | null = null;
} 

export function LoadPersonTopicFormComponent() {
    LoadPersonTopicDetailsComponent();
}

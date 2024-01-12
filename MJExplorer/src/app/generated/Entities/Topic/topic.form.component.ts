import { Component } from '@angular/core';
import { TopicEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadTopicDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Topics') // Tell MemberJunction about this class
@Component({
    selector: 'gen-topic-form',
    templateUrl: './topic.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class TopicFormComponent extends BaseFormComponent {
    public record: TopicEntity | null = null;
} 

export function LoadTopicFormComponent() {
    LoadTopicDetailsComponent();
}

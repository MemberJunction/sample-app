import { Component, Input } from '@angular/core';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormSectionComponent } from '@memberjunction/ng-explorer-core';
import { PersonTopicEntity } from 'mj_generatedentities';

@RegisterClass(BaseFormSectionComponent, 'Person Topics.details') // Tell MemberJunction about this class 
@Component({
    selector: 'gen-persontopic-form-details',
    styleUrls: ['../../../../../shared/form-styles.css'],
    template: `<div *ngIf="this.record">
    <div *ngIf="this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Person ID</label>
            <kendo-numerictextbox [(value)]="record.PersonID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Topic ID</label>
            <kendo-numerictextbox [(value)]="record.TopicID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Book Topic ID</label>
            <kendo-numerictextbox [(value)]="record.BookTopicID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Date Added</label>
            <kendo-datepicker [(value)]="record.DateAdded" ></kendo-datepicker>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Interest Level</label>
            <kendo-numerictextbox [(value)]="record.InterestLevel" ></kendo-numerictextbox>   
        </div> 
    </div>
    <div *ngIf="!this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Person ID</label>
            <span mjFieldLink [record]="record" fieldName="PersonID" >{{FormatValue('PersonID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Topic ID</label>
            <span mjFieldLink [record]="record" fieldName="TopicID" >{{FormatValue('TopicID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Book Topic ID</label>
            <span mjFieldLink [record]="record" fieldName="BookTopicID" >{{FormatValue('BookTopicID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Date Added</label>
            <span >{{FormatValue('DateAdded', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Interest Level</label>
            <span >{{FormatValue('InterestLevel', 0)}}</span>
        </div>
    </div>
</div>
    `
})
export class PersonTopicDetailsComponent extends BaseFormSectionComponent {
    @Input() override record: PersonTopicEntity | null = null;
    @Input() override EditMode: boolean = false;
}

export function LoadPersonTopicDetailsComponent() {
    // does nothing, but called in order to prevent tree-shaking from eliminating this component from the build
}

import { Component, Input } from '@angular/core';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormSectionComponent } from '@memberjunction/ng-explorer-core';
import { BookTopicEntity } from 'mj_generatedentities';

@RegisterClass(BaseFormSectionComponent, 'Book Topics.details') // Tell MemberJunction about this class 
@Component({
    selector: 'gen-booktopic-form-details',
    styleUrls: ['../../../../../shared/form-styles.css'],
    template: `<div *ngIf="this.record">
    <div *ngIf="this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Book ID</label>
            <kendo-numerictextbox [(value)]="record.BookID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Topic ID</label>
            <kendo-numerictextbox [(value)]="record.TopicID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Created At</label>
            <span >{{FormatValue('CreatedAt', 0)}}</span>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Updated At</label>
            <span >{{FormatValue('UpdatedAt', 0)}}</span>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Book</label>
            <span >{{FormatValue('Book', 0)}}</span>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Topic</label>
            <span >{{FormatValue('Topic', 0)}}</span>   
        </div> 
    </div>
    <div *ngIf="!this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Book ID</label>
            <span mjFieldLink [record]="record" fieldName="BookID" >{{FormatValue('BookID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Topic ID</label>
            <span mjFieldLink [record]="record" fieldName="TopicID" >{{FormatValue('TopicID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Created At</label>
            <span >{{FormatValue('CreatedAt', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Updated At</label>
            <span >{{FormatValue('UpdatedAt', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Book</label>
            <span >{{FormatValue('Book', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Topic</label>
            <span >{{FormatValue('Topic', 0)}}</span>
        </div>
    </div>
</div>
    `
})
export class BookTopicDetailsComponent extends BaseFormSectionComponent {
    @Input() override record: BookTopicEntity | null = null;
    @Input() override EditMode: boolean = false;
}

export function LoadBookTopicDetailsComponent() {
    // does nothing, but called in order to prevent tree-shaking from eliminating this component from the build
}

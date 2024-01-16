import { Component, Input } from '@angular/core';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormSectionComponent } from '@memberjunction/ng-explorer-core';
import { PersonEntity } from 'mj_generatedentities';

@RegisterClass(BaseFormSectionComponent, 'Persons.details') // Tell MemberJunction about this class 
@Component({
    selector: 'gen-person-form-details',
    styleUrls: ['../../../../../shared/form-styles.css'],
    template: `<div *ngIf="this.record">
    <div *ngIf="this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">First Name</label>
            <kendo-textbox [(ngModel)]="record.FirstName"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Last Name</label>
            <kendo-textbox [(ngModel)]="record.LastName"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Organization ID</label>
            <kendo-numerictextbox [(value)]="record.OrganizationID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Email</label>
            <kendo-textbox [(ngModel)]="record.Email"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Phone</label>
            <kendo-textbox [(ngModel)]="record.Phone"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Created At</label>
            <span >{{FormatValue('CreatedAt', 0)}}</span>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Updated At</label>
            <span >{{FormatValue('UpdatedAt', 0)}}</span>   
        </div> 
    </div>
    <div *ngIf="!this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">First Name</label>
            <span >{{FormatValue('FirstName', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Last Name</label>
            <span >{{FormatValue('LastName', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Organization ID</label>
            <span >{{FormatValue('OrganizationID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Email</label>
            <span >{{FormatValue('Email', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Phone</label>
            <span >{{FormatValue('Phone', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Created At</label>
            <span >{{FormatValue('CreatedAt', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Updated At</label>
            <span >{{FormatValue('UpdatedAt', 0)}}</span>
        </div>
    </div>
</div>
    `
})
export class PersonDetailsComponent extends BaseFormSectionComponent {
    @Input() override record: PersonEntity | null = null;
    @Input() override EditMode: boolean = false;
}

export function LoadPersonDetailsComponent() {
    // does nothing, but called in order to prevent tree-shaking from eliminating this component from the build
}

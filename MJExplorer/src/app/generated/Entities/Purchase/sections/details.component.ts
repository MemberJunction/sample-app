import { Component, Input } from '@angular/core';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormSectionComponent } from '@memberjunction/ng-explorer-core';
import { PurchaseEntity } from 'mj_generatedentities';

@RegisterClass(BaseFormSectionComponent, 'Purchases.details') // Tell MemberJunction about this class 
@Component({
    selector: 'gen-purchase-form-details',
    styleUrls: ['../../../../../shared/form-styles.css'],
    template: `<div *ngIf="this.record">
    <div *ngIf="this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Date</label>
            <kendo-datepicker [(value)]="record.Date" ></kendo-datepicker>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Person ID</label>
            <kendo-numerictextbox [(value)]="record.PersonID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Grand Total</label>
            <kendo-numerictextbox [(value)]="record.GrandTotal" ></kendo-numerictextbox>   
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
            <label class="fieldLabel">Date</label>
            <span >{{FormatValue('Date', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Person ID</label>
            <span mjFieldLink [record]="record" fieldName="PersonID" >{{FormatValue('PersonID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Grand Total</label>
            <span >{{FormatValue('GrandTotal', 0)}}</span>
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
export class PurchaseDetailsComponent extends BaseFormSectionComponent {
    @Input() override record: PurchaseEntity | null = null;
    @Input() override EditMode: boolean = false;
}

export function LoadPurchaseDetailsComponent() {
    // does nothing, but called in order to prevent tree-shaking from eliminating this component from the build
}

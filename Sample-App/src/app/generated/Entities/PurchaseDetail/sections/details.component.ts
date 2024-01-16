import { Component, Input } from '@angular/core';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormSectionComponent } from '@memberjunction/ng-explorer-core';
import { PurchaseDetailEntity } from 'mj_generatedentities';

@RegisterClass(BaseFormSectionComponent, 'Purchase Details.details') // Tell MemberJunction about this class 
@Component({
    selector: 'gen-purchasedetail-form-details',
    styleUrls: ['../../../../../shared/form-styles.css'],
    template: `<div *ngIf="this.record">
    <div *ngIf="this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Purchase ID</label>
            <kendo-numerictextbox [(value)]="record.PurchaseID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Book ID</label>
            <kendo-numerictextbox [(value)]="record.BookID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Quantity</label>
            <kendo-numerictextbox [(value)]="record.Quantity" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Amount</label>
            <kendo-numerictextbox [(value)]="record.Amount" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Discount</label>
            <kendo-numerictextbox [(value)]="record.Discount" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Total</label>
            <kendo-numerictextbox [(value)]="record.Total" ></kendo-numerictextbox>   
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
            <label class="fieldLabel">Purchase ID</label>
            <span mjFieldLink [record]="record" fieldName="PurchaseID" >{{FormatValue('PurchaseID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Book ID</label>
            <span mjFieldLink [record]="record" fieldName="BookID" >{{FormatValue('BookID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Quantity</label>
            <span >{{FormatValue('Quantity', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Amount</label>
            <span >{{FormatValue('Amount', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Discount</label>
            <span >{{FormatValue('Discount', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Total</label>
            <span >{{FormatValue('Total', 0)}}</span>
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
export class PurchaseDetailDetailsComponent extends BaseFormSectionComponent {
    @Input() override record: PurchaseDetailEntity | null = null;
    @Input() override EditMode: boolean = false;
}

export function LoadPurchaseDetailDetailsComponent() {
    // does nothing, but called in order to prevent tree-shaking from eliminating this component from the build
}

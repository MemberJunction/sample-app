import { Component } from '@angular/core';
import { PurchaseDetailEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadPurchaseDetailDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Purchase Details') // Tell MemberJunction about this class
@Component({
    selector: 'gen-purchasedetail-form',
    templateUrl: './purchasedetail.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class PurchaseDetailFormComponent extends BaseFormComponent {
    public record: PurchaseDetailEntity | null = null;
} 

export function LoadPurchaseDetailFormComponent() {
    LoadPurchaseDetailDetailsComponent();
}

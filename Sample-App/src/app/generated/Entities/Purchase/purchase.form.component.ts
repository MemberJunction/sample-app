import { Component } from '@angular/core';
import { PurchaseEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadPurchaseDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Purchases') // Tell MemberJunction about this class
@Component({
    selector: 'gen-purchase-form',
    templateUrl: './purchase.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class PurchaseFormComponent extends BaseFormComponent {
    public record: PurchaseEntity | null = null;
} 

export function LoadPurchaseFormComponent() {
    LoadPurchaseDetailsComponent();
}

import { Component } from '@angular/core';
import { OrganizationEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-explorer-core';
import { LoadOrganizationDetailsComponent } from "./sections/details.component"
@RegisterClass(BaseFormComponent, 'Organizations') // Tell MemberJunction about this class
@Component({
    selector: 'gen-organization-form',
    templateUrl: './organization.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class OrganizationFormComponent extends BaseFormComponent {
    public record: OrganizationEntity | null = null;
} 

export function LoadOrganizationFormComponent() {
    LoadOrganizationDetailsComponent();
}

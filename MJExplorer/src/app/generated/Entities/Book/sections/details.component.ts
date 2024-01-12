import { Component, Input } from '@angular/core';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormSectionComponent } from '@memberjunction/ng-explorer-core';
import { BookEntity } from 'mj_generatedentities';

@RegisterClass(BaseFormSectionComponent, 'Books.details') // Tell MemberJunction about this class 
@Component({
    selector: 'gen-book-form-details',
    styleUrls: ['../../../../../shared/form-styles.css'],
    template: `<div *ngIf="this.record">
    <div *ngIf="this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Book Category ID</label>
            <kendo-numerictextbox [(value)]="record.BookCategoryID" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Name</label>
            <kendo-textbox [(ngModel)]="record.Name"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Description</label>
            <kendo-textbox [(ngModel)]="record.Description"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Cover Image URL</label>
            <kendo-textarea [(ngModel)]="record.CoverImageURL" ></kendo-textarea>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Pages</label>
            <kendo-numerictextbox [(value)]="record.Pages" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Full Text</label>
            <kendo-textbox [(ngModel)]="record.FullText"  />   
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
            <label class="fieldLabel">Price</label>
            <kendo-numerictextbox [(value)]="record.Price" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Discount Amount</label>
            <kendo-numerictextbox [(value)]="record.DiscountAmount" ></kendo-numerictextbox>   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Author</label>
            <kendo-textbox [(ngModel)]="record.Author"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Language</label>
            <kendo-textbox [(ngModel)]="record.Language"  />   
        </div>               
        <div class="record-form-row">
            <label class="fieldLabel">Book Category</label>
            <span >{{FormatValue('BookCategory', 0)}}</span>   
        </div> 
    </div>
    <div *ngIf="!this.EditMode" class="record-form">
                  
        <div class="record-form-row">
            <label class="fieldLabel">Book Category ID</label>
            <span mjFieldLink [record]="record" fieldName="BookCategoryID" >{{FormatValue('BookCategoryID', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Name</label>
            <span >{{FormatValue('Name', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Description</label>
            <span >{{FormatValue('Description', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Cover Image URL</label>
            <span >{{FormatValue('CoverImageURL', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Pages</label>
            <span >{{FormatValue('Pages', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Full Text</label>
            <span >{{FormatValue('FullText', 0)}}</span>
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
            <label class="fieldLabel">Price</label>
            <span >{{FormatValue('Price', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Discount Amount</label>
            <span >{{FormatValue('DiscountAmount', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Author</label>
            <span >{{FormatValue('Author', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Language</label>
            <span >{{FormatValue('Language', 0)}}</span>
        </div>              
        <div class="record-form-row">
            <label class="fieldLabel">Book Category</label>
            <span >{{FormatValue('BookCategory', 0)}}</span>
        </div>
    </div>
</div>
    `
})
export class BookDetailsComponent extends BaseFormSectionComponent {
    @Input() override record: BookEntity | null = null;
    @Input() override EditMode: boolean = false;
}

export function LoadBookDetailsComponent() {
    // does nothing, but called in order to prevent tree-shaking from eliminating this component from the build
}

import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Metadata, RunView } from '@memberjunction/core';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { BookCategoryEntity } from 'mj_generatedentities';
import { SharedService } from 'src/app/utils/shared-service';

@Component({
  selector: 'sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
  @Input() public category: any;
  private md = new Metadata();
  public subCategories: any = [];
  public categoryEntity !: BookCategoryEntity;
  public isLoading: boolean = false;
  public formGroup: FormGroup | undefined;
  private editedRowIndex: number | undefined;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    const rv = new RunView();
    const result = await rv.RunView({
      EntityName: 'Book Categories',
      ExtraFilter: `ParentID=${this.category.ID}`
    });
    if (result.Success) {
      this.isLoading = false;
      this.subCategories = result.Results;
    }
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      ID: new FormControl(),
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
    });
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);

    this.formGroup = new FormGroup({
      ID: new FormControl(dataItem.ID),
      Name: new FormControl(dataItem.Name, Validators.required),
      Description: new FormControl(dataItem.Description, Validators.required),
    });
    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent) {
    this.closeEditor(args.sender, args.rowIndex);
  }

  public async saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    const { ID, Name, Description } = formGroup.value;
    this.categoryEntity = <BookCategoryEntity>await this.md.GetEntityObject('Book Categories');
    if (isNew) {
      this.categoryEntity.NewRecord();
    } else {
      await this.categoryEntity.Load(ID);
    }
    this.isLoading = true;
    this.categoryEntity.Name = Name;
    this.categoryEntity.ParentID = this.category.ID;
    this.categoryEntity.Description = Description;
    await this.categoryEntity.Save();
    this.loadData();
    sender.closeRow(rowIndex);
  }

  public async removeHandler(args: RemoveEvent) {
    const { ID } = args.dataItem;
    this.categoryEntity = <BookCategoryEntity>await this.md.GetEntityObject('Topics');
    await this.categoryEntity.Load(ID);
    if (!await this.categoryEntity.Delete()) {
      this.sharedService.DisplayNotification('Error deleting Topic', 'error');
    } else {
      this.loadData();
    }
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }


  onGridRowClick(e: any) {
    if (e.columnIndex !== 2) {
      this.router.navigate(['admin', 'category-detail', e.dataItem.ID]);
    }
  }

}

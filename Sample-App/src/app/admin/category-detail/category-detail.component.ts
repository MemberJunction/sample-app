import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Metadata, RunView } from '@memberjunction/core';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { BookCategoryEntity, BookEntity, BookTopicEntity, TopicEntity } from 'mj_generatedentities';
import { SharedData } from 'src/app/utils/shared-data';
import { SharedService } from 'src/app/utils/shared-service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent {
  public loading: boolean = false;
  public booksByCategory: any[] = [];
  public categoryId!: number;
  public category: BookCategoryEntity | undefined = undefined;
  public formGroup: FormGroup = new FormGroup({});
  public readyToLoad: boolean = false;
  private editedRowIndex: number | undefined;
  private md = new Metadata();
  public bookEntity !: BookEntity;

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService, public sharedData: SharedData, public titleService: Title) {
    this.route.params.subscribe(params => {
      let categoryId = params['categoryId'];
      if (categoryId !== undefined && categoryId !== null && !this.categoryId)
        this.categoryId = parseInt(categoryId);
    });
  }

  async ngOnInit(): Promise<void> {
    this.sharedService.setupComplete$.subscribe(isComplete => {
      if (isComplete) {
        this.loadData();
      }
    });
  }

  async getLatestData() {
    setTimeout(async () => {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Books',
        ExtraFilter: `BookCategoryID=${this.categoryId}`

      });
      if (result.Success) {
        this.booksByCategory = result.Results.sort((a: BookEntity, b: BookEntity) => { return a.ID < b.ID ? 1 : -1 });
      }
      this.titleService.setTitle(`${this.category?.Name}`)
    }, 50);
  }

  async loadData() {
    this.loading = true;
    this.sharedService.setupComplete$.subscribe(async (isComplete) => {
      if (isComplete) {
        if (this.categoryId !== null && this.categoryId !== undefined) {
          if (this.category === null || this.category === undefined) {
            this.category = this.sharedData.BookCategories.find(r => r.ID === this.categoryId);
          }
          if (this.category !== null && this.categoryId !== undefined) {
            this.getLatestData();
            this.loading = false;
          }
        }
      }
    });
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      ID: new FormControl(),
      Name: new FormControl('', Validators.required),
      Pages: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      Description: new FormControl('', Validators.required),
    });
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);

    this.formGroup = new FormGroup({
      ID: new FormControl(dataItem.ID),
      Name: new FormControl(dataItem.Name, Validators.required),
      Pages: new FormControl(dataItem.Pages, Validators.required),
      Description: new FormControl(dataItem.Description, Validators.required),
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent) {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }

  public async saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    const { ID, Name, Pages, Description, TopicID } = formGroup.value;
    this.bookEntity = <BookEntity>await this.md.GetEntityObject('Books');
    if (isNew) {
      this.bookEntity.NewRecord();
    } else {
      await this.bookEntity.Load(ID);
    }
    this.bookEntity.Name = Name;
    this.bookEntity.Pages = Pages;
    this.bookEntity.Description = Description;
    await this.bookEntity.Save();
    this.getLatestData();
    sender.closeRow(rowIndex);
  }

  public async removeHandler(args: RemoveEvent) {
    const { ID } = args.dataItem;
    this.bookEntity = <BookEntity>await this.md.GetEntityObject('Books');
    const rv = new RunView();
    const result = await rv.RunView({
      EntityName: 'Book Topics',
      ExtraFilter: `TopicID=${this.categoryId} AND BookID=${ID}`
    });
    if (result.Success && result.Results.length) {
      const bookTopicEntity = <BookTopicEntity>await this.md.GetEntityObject('Book Topics');
      const bookTopic: any = result.Results;
      await bookTopicEntity.Load(bookTopic[0].ID);
      await this.bookEntity.Load(ID);
      if (!await bookTopicEntity.Delete() || !await this.bookEntity.Delete()) {
        this.sharedService.DisplayNotification('Error deleting Book details', 'error');
      } else {
        this.getLatestData();
      }
    }

  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    // this.formGroup = undefined;
  }


  onGridRowClick(e: any) {
    if (e.columnIndex !== 4) {
      this.router.navigate(['book-detail', e.dataItem.ID]);
    }
  }

  navTo(url: string) {
    this.router.navigate([url]);
  }
}

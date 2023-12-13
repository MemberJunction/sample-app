import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Metadata, RunView } from '@memberjunction/core';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { BookEntity, TopicEntity } from 'mj_generatedentities';
import { SharedData } from 'src/app/utils/shared-data';
import { SharedService } from 'src/app/utils/shared-service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent {
  public loaded: boolean = false;
  public booksByTopic: any[] = [];
  public topicId: number | null = null
  public topic: TopicEntity | undefined = undefined;
  public formGroup: FormGroup | undefined;
  public readyToLoad: boolean = false;
  private editedRowIndex: number | undefined;
  private md = new Metadata();
  public bookEntity !: BookEntity;

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService, public sharedData: SharedData, public titleService: Title) {
    this.route.params.subscribe(params => {
      let topicId = params['topicId'];
      if (topicId !== undefined && topicId !== null && !this.topicId)
        this.topicId = parseInt(topicId);
    });
  }

  async ngOnInit(): Promise<void> {
    this.sharedService.setupComplete$.subscribe(isComplete => {
      if (isComplete) {
        this.loadData();
      }
    });
  }

  async groupAndFilterData() {
    setTimeout(async () => {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Books',
        ExtraFilter: `Id IN (SELECT bt.BookID from dbo.vwBookTopics bt WHERE bt.TopicID=${this.topicId})`

      });
      if (result.Success) {
        this.booksByTopic = result.Results;
      }
      // update the browser title
      this.titleService.setTitle(`${this.topic?.Name}`)
    }, 50);
  }

  handleGroupBy() {
    this.groupAndFilterData();
  }

  async loadData() {
    this.sharedService.setupComplete$.subscribe(async (isComplete) => {
      if (isComplete) {
        if (this.topicId !== null && this.topicId !== undefined) {
          if (this.topic === null || this.topic === undefined) {
            this.topic = this.sharedData.BookTopics.find(r => r.ID === this.topicId);
          }
          if (this.topic !== null && this.topicId !== undefined) {
            this.groupAndFilterData();
            this.loaded = true;
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
      Pages: new FormControl('', Validators.required),
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
    const { ID, Name,Pages, Description} = formGroup.value;
    this.bookEntity = <BookEntity>await this.md.GetEntityObject('Books');
    await this.bookEntity.Load(ID);
    this.bookEntity.Name = Name;
    this.bookEntity.Pages = Pages;
    this.bookEntity.Description = Description;
    await this.bookEntity.Save();
    sender.closeRow(rowIndex);
  }

  public async removeHandler(args: RemoveEvent) {
    console.log(args);
    const { ID, Name, Description} = args.dataItem;
    this.bookEntity = <BookEntity>await this.md.GetEntityObject('Books');
    await this.bookEntity.Load(ID);
    if(!await this.bookEntity.Delete()){
      this.sharedService.DisplayNotification('Error deleting Book details', 'error');
    }
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }


  onGridRowClick(e: any) {
      this.router.navigate(['book-detail', e.dataItem.ID]);
  }

  navTo(url: string) {
    this.router.navigate([url]);
  }
}

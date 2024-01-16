import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Metadata, RunView } from '@memberjunction/core';
import { MJAuthBase } from '@memberjunction/ng-auth-services';
import { AddEvent, CancelEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { TopicEntity } from 'mj_generatedentities';
import { SharedData } from 'src/app/utils/shared-data';
import { SharedService } from 'src/app/utils/shared-service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent {
  public bookTopics: TopicEntity[] = [];
  public loaded: boolean = false;
  public formGroup: FormGroup | undefined;
  public readyToLoad: boolean = false;
  private editedRowIndex: number | undefined;
  private md = new Metadata();
  public topicEntity !: TopicEntity;

  constructor(public auth: MJAuthBase, private router: Router, private sharedService: SharedService, private sharedData: SharedData) { }

  async ngOnInit(): Promise<void> {
    this.sharedService.setupComplete$.subscribe(setupComplete => {
      if (setupComplete) {
        this.loadData();
      }
    });
  }

  public async loadData() {
    try {
      if (this.loaded) return;

      // get the data from the database on our list of roles
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Topics'
      });
      if(result.Success) {
        this.bookTopics = result.Results.sort((a: TopicEntity, b: TopicEntity) => { return a.ID < b.ID ? 1 : -1 });
      }
      this.loaded = true;
    }
    catch (e) {
      console.log(e);
    }
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      ID: new FormControl(),
      Name: new FormControl('', Validators.required),
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
    const { ID, Name, Description} = formGroup.value;
    this.topicEntity = <TopicEntity>await this.md.GetEntityObject('Topics');
    if(isNew) {
      this.topicEntity.NewRecord();
    } else {
      await this.topicEntity.Load(ID);
    }
    this.topicEntity.Name = Name;
    this.topicEntity.Description = Description;
    await this.topicEntity.Save();
    this.loaded = false;
    this.loadData();
    sender.closeRow(rowIndex);
  }

  public async removeHandler(args: RemoveEvent) {
    const { ID } = args.dataItem;
    this.topicEntity = <TopicEntity>await this.md.GetEntityObject('Topics');
    await this.topicEntity.Load(ID);
    if(!await this.topicEntity.Delete()){
      this.sharedService.DisplayNotification('Error deleting Topic', 'error');
    } else {
      this.loaded = false;
      this.loadData();
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
    if(e.columnIndex !== 2) {
      this.router.navigate(['admin','topic-detail', e.dataItem.ID]);
    }
  }
}

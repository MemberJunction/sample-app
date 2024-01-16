import { Component, OnInit } from '@angular/core';
import { SharedService } from '../utils/shared-service';
import { OrganizationEntity, PersonEntity, PersonTopicEntity, PurchaseEntity, TopicEntity } from 'mj_generatedentities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Metadata, RunView } from '@memberjunction/core';
import { UserEntity } from '@memberjunction/core-entities';
import { SharedData } from '../utils/shared-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData!: PersonEntity;
  public organizationEntity!: OrganizationEntity;
  public currentUser!: UserEntity;
  public topicDisabled: boolean = true;
  public personForm: FormGroup = new FormGroup({});
  public businessForm: FormGroup = new FormGroup({});
  public purchases: PurchaseEntity[] = [];
  public ordersLoading: boolean = false;
  public value = 10;
  public topics: TopicEntity[] = [];
  public personTopics: PersonTopicEntity[] = [];
  public displayData: any[] = [];

  constructor(private sharedService: SharedService, private formBuilder: FormBuilder, private sharedData: SharedData) { }

  async ngOnInit() {
    this.personForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
    });
    this.businessForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      StateProvince: ['', Validators.required],
      PostalCode: ['', Validators.required],
      Country: ['', Validators.required],
      Website: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
    });

    this.sharedService.setupComplete$.subscribe(setupComplete => {
      if (setupComplete) {
        this.loadData();
        this.topics = this.sharedData.Topics;
      }
    });
  }

  async loadData() {
    const md = new Metadata();
    this.userData = <PersonEntity>await md.GetEntityObject('Persons');
    this.currentUser = <UserEntity>await md.GetEntityObject('Users');

    await this.currentUser.Load(md.CurrentUser.ID);
    if (this.currentUser.LinkedEntityRecordID && this.currentUser.LinkedEntityID) {
      this.topicDisabled = false;
      await this.userData.Load(this.currentUser.LinkedEntityRecordID);
      this.loadPurchases();
      this.personForm.patchValue({
        FirstName: this.userData.FirstName,
        LastName: this.userData.LastName,
        Email: this.userData.Email,
        Phone: this.userData.Phone,
      });
    } else {
      this.personForm.patchValue({
        Email: this.currentUser.Email,
      });
      this.userData.NewRecord();
    }
    this.loadOrganizationDetails();
    this.loadPersonTopics();
  }

  async loadOrganizationDetails() {
    const md = new Metadata();
    this.organizationEntity = <OrganizationEntity>await md.GetEntityObject('Organizations');
    if (this.userData.OrganizationID) {
      await this.organizationEntity.Load(this.userData.OrganizationID);
      this.businessForm.patchValue({
        Name: this.organizationEntity.Name,
        Address: this.organizationEntity.Address,
        City: this.organizationEntity.City,
        StateProvince: this.organizationEntity.StateProvince,
        PostalCode: this.organizationEntity.PostalCode,
        Country: this.organizationEntity.Country,
        Website: this.organizationEntity.Website,
        Phone: this.organizationEntity.Phone
      });
    } else {
      this.organizationEntity.NewRecord();
    }
  }

  async loadPersonTopics() {
    const md = new Metadata();
    const rv = new RunView();
    const result = await rv.RunView({
      EntityName: 'Person Topics',
      ExtraFilter: `PersonID=${1}` // md.CurrentUser.LinkedEntityRecordID
    });
    if (result.Success) {
      this.personTopics = result.Results;
      this.displayData = this.topics.map(topic => {
        const matchingPersonTopic = this.personTopics.find(personTopic => personTopic.TopicID === topic.ID);

        return {
          PersonTopicID: matchingPersonTopic ? matchingPersonTopic.ID : null,
          InterestLevel: matchingPersonTopic ? matchingPersonTopic.InterestLevel : 50,
          TopicID: topic.ID,
          Name: topic.Name,
          checked: matchingPersonTopic ? true : false
        };
      });
      const a = this.personTopics;
      const b = this.displayData;
    }
  }

  async loadPurchases() {
    this.ordersLoading = true;
    const rv = new RunView();
    const result = await rv.RunView({
      EntityName: 'Purchases',
      ExtraFilter: `PersonID=${this.userData.ID}`
    });
    if (result.Success) {
      this.ordersLoading = false;
      this.purchases = result.Results;
    }
  }

  async onPersonalDataSave() {
    if (this.personForm.valid) {
      const { FirstName, LastName, Email, Phone } = this.personForm.value;
      this.userData.FirstName = FirstName;
      this.userData.LastName = LastName;
      this.userData.Email = Email;
      this.userData.Phone = Phone;
      await this.userData.Save();
      if (!this.currentUser.LinkedEntityRecordID || !this.currentUser.LinkedEntityID) {
        this.currentUser.LinkedEntityRecordID = this.userData.ID;
        this.currentUser.LinkedEntityID = this.userData.EntityInfo.ID;
        await this.currentUser.Save();
      }
    }
  }

  async onBusinessDataSave() {
    if (this.businessForm.valid) {
      const { Name, Address, City, StateProvince, PostalCode, Country, Website, Phone } = this.businessForm.value;
      this.organizationEntity.Name = Name;
      this.organizationEntity.Address = Address;
      this.organizationEntity.City = City;
      this.organizationEntity.StateProvince = StateProvince;
      this.organizationEntity.PostalCode = PostalCode;
      this.organizationEntity.Country = Country;
      this.organizationEntity.Website = Website;
      this.organizationEntity.Phone = Phone;
      if (await this.organizationEntity.Save()) {
        this.sharedService.DisplayNotification("Save Successful!", 'success');
        if (this.userData.ID && !this.userData.OrganizationID) {
          this.userData.OrganizationID = this.organizationEntity.ID;
          await this.userData.Save();
        }
      }
    }
  }

  async onPersonalTopicsSave() {
    const md = new Metadata();
    const finalPayload = this.displayData.map(secondItem => {
      const firstItem = this.personTopics.find(item => item.ID === secondItem.PersonTopicID);

      if (secondItem.PersonTopicID === null && secondItem.checked === true) {
        return {
          ...secondItem,
          isAdded: true
        };
      } else if (firstItem && secondItem.PersonTopicID === firstItem.ID && secondItem.checked) {
        return {
          ...secondItem,
          isModified: true
        };
      } else if (firstItem && secondItem.PersonTopicID === firstItem.ID && !secondItem.checked) {
        return {
          ...secondItem,
          checked: false,
          isRemoved: true
        };
      }
      return null;
    }).filter(item => item !== null);
    const personTopicEntity = <PersonTopicEntity>await md.GetEntityObject('Person Topics');
    for (let i = 0; i < finalPayload.length; i++) {
      const topic = finalPayload[i];
      if (topic.isAdded) {
        personTopicEntity.NewRecord();
        personTopicEntity.PersonID = this.userData.ID;
        personTopicEntity.TopicID = topic.TopicID;
        personTopicEntity.InterestLevel = topic.InterestLevel;
        await personTopicEntity.Save();
      } else if (topic.isModified) {
        await personTopicEntity.Load(topic.PersonTopicID);
        personTopicEntity.InterestLevel = topic.InterestLevel;
        await personTopicEntity.Save();
      } else if (topic.isRemoved) {
        await personTopicEntity.Load(topic.PersonTopicID);
        await personTopicEntity.Delete();
      }
    }
  }

  public title = (value: number): string => {
    return value === 0 || value === 100 ? value.toString() : '';
  };

}
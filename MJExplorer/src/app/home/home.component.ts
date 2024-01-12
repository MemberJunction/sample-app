import { Component, OnInit } from '@angular/core';
import { SharedService } from '../utils/shared-service';
import { PersonEntity } from 'mj_generatedentities';
import { Metadata } from '@memberjunction/core';
import { SharedData } from '../utils/shared-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userData!: PersonEntity;
  public isAdmin: boolean = false;
  public categories: any[] = [];
  public topics: any[] = [];


  constructor(private sharedService: SharedService, private sharedData: SharedData) { }

  async ngOnInit() {
    this.sharedService.setupComplete$.subscribe(setupComplete => {
      if (setupComplete) {
        this.loadData();
      }
    });
  }

  async loadData() {
    this.categories = this.sharedData.BookCategories.sort((a, b) => a.DisplayRank > b.DisplayRank ? 1 : -1).slice(0, 4);
    this.topics = this.sharedData.Topics.sort((a, b) => a.DisplayRank > b.DisplayRank ? 1 : -1);
  }

}

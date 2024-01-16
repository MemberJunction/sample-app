import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RunView } from '@memberjunction/core';
import { MJAuthBase } from '@memberjunction/ng-auth-services';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../utils/shared-service';
import { SharedData } from '../utils/shared-data';
import { BookCategoryEntity } from 'mj_generatedentities';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent {
  public categories: any[] = [];
  public loaded: boolean = false;
  public readyToLoad: boolean = false;

  // Inject the authentication service into your component through the constructor
  constructor(@Inject(DOCUMENT) public document: Document, public auth: MJAuthBase, private router: Router, private sharedService: SharedService, private sharedData: SharedData) {}

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
      this.categories =  this.sharedData.BookCategories.sort((a: BookCategoryEntity, b: BookCategoryEntity) => { return a.Name > b.Name ? 1 : -1 });
      this.loaded = true;
  }
    catch (e) {
      console.log(e);
    }
  }    

  public categorySelect(category: BookCategoryEntity) {
    this.router.navigate(['category', category.ID]);
  }
}

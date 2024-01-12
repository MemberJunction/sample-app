import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCategoryEntity, BookEntity } from 'mj_generatedentities';
import { SharedService } from '../utils/shared-service';
import { SharedData } from '../utils/shared-data';
import { Title } from '@angular/platform-browser';
import { RunView } from '@memberjunction/core';
import { Book } from '../book-detail/book-detail.component';
import { CartService } from '../utils/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public loaded: boolean = false;
  public booksByCategory: any[] = [];
  public categoryId: number | null = null
  public category: BookCategoryEntity | undefined = undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private sharedService: SharedService, 
    public sharedData: SharedData, 
    public titleService: Title,
    private cartService: CartService,
    ) {
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

  async groupAndFilterData() {
    setTimeout(async () => {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Books',
        ExtraFilter: `BookCategoryId = ${this.categoryId}`

      });
      if (result.Success) {
        debugger;
        this.booksByCategory = result.Results;
      }
      // update the browser title
      this.titleService.setTitle(`${this.category?.Name}`)
    }, 50);
  }

  handleGroupBy(groupByField: string, groupByFieldTitle: string) {
    this.groupAndFilterData();
  }

  async loadData() {
    this.sharedService.setupComplete$.subscribe(async (isComplete) => {
      if (isComplete) {
        if (this.categoryId !== null && this.categoryId !== undefined) {
          if (this.category === null || this.category === undefined) {
            this.category = this.sharedData.BookCategories.find(r => r.ID === this.categoryId);
          }
          if (this.category !== null && this.category !== undefined) {
            // get the tax data for this role from the shared data cache
            const role = this.category.Name;
            this.groupAndFilterData();
            this.loaded = true;
          }
        }
      }
    });
  }


  goToDetails(book: BookEntity) {
    if (this.category) {
      this.router.navigate(['book-detail', book.ID]);
    }
  }

  navTo(url: string) {
    this.router.navigate([url]);
  }


  addToCart(bookDetail: BookEntity) {
    const book: Book = {
      ID: bookDetail.ID,
      Name: bookDetail.Name,
      Description: bookDetail.Description,
      Author: bookDetail.Author,
      Language: bookDetail.Language,
      Price: bookDetail.Price,
      Quantity: 1
    };
    this.cartService.addToCart(book);
    this.router.navigate(['/cart']);
  }

}

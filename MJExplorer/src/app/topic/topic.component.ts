import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCategoryEntity, BookEntity, TopicEntity } from 'mj_generatedentities';
import { SharedService } from '../utils/shared-service';
import { SharedData } from '../utils/shared-data';
import { Title } from '@angular/platform-browser';
import { RunView } from '@memberjunction/core';
import { Book } from '../book-detail/book-detail.component';
import { CartService } from '../utils/cart.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  public loaded: boolean = false;
  public booksByTopic: any[] = [];
  public topicId: number | null = null
  public topic : TopicEntity | undefined = undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private sharedService: SharedService, 
    public sharedData: SharedData, 
    public titleService: Title,
    private cartService: CartService,
    ) {
    this.route.params.subscribe(params => {
      let categoryId = params['topicId'];
      if (categoryId !== undefined && categoryId !== null && !this.topicId)
        this.topicId = parseInt(categoryId);
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

  handleGroupBy(groupByField: string, groupByFieldTitle: string) {
    this.groupAndFilterData();
  }

  async loadData() {
    this.sharedService.setupComplete$.subscribe(async (isComplete) => {
      if (isComplete) {
        if (this.topicId !== null && this.topicId !== undefined) {
          if (this.topic === null || this.topic === undefined) {
            this.topic = this.sharedData.BookCategories.find(r => r.ID === this.topicId);
          }
          if (this.topic !== null && this.topic !== undefined) {
            // get the tax data for this role from the shared data cache
            const role = this.topic.Name;
            this.groupAndFilterData();
            this.loaded = true;
          }
        }
      }
    });
  }


  goToDetails(book: BookEntity) {
    if (this.topic) {
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
      Language: bookDetail.Language,
      Author: bookDetail.Author,
      Price: bookDetail.Price,
      Quantity: 1
    };
    this.cartService.addToCart(book);
    this.router.navigate(['/cart']);
  }

}

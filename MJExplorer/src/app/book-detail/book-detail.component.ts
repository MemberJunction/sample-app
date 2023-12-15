import { Component } from '@angular/core';
import { SharedService } from '../utils/shared-service';
import { BookEntity } from 'mj_generatedentities';
import { Metadata, RunView } from '@memberjunction/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../utils/cart.service';

export interface Book {
  ID: number;
  Name: string;
  Description: string;
  Quantity: number;
  Amount: number;
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  public bookDetail!: BookEntity;
  public bookId!: number;
  public quantity: number = 1;
  public topic: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService, private cartService: CartService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      let bookId = params['bookId'];
      if (bookId !== undefined && bookId !== null && !this.bookId)
        this.bookId = parseInt(bookId);

    });
    this.sharedService.setupComplete$.subscribe(isComplete => {
      if (isComplete) {
        this.loadBookDetails();
      }
    });

  }

  async loadBookDetails() {
    const md = new Metadata();
    this.bookDetail = <BookEntity>await md.GetEntityObject('Books');
    this.bookDetail.Load(this.bookId);
    const rv = new RunView();
    const result = await rv.RunView({
      EntityName: 'Topics',
      ExtraFilter: `ID in (SELECT TOPICID from vwBookTopics WHERE BookID=${this.bookId})`
    });
    if (result.Success && result.Results.length) {
      const results: any = result.Results;
      this.topic = results[0].Name;
    }
  }

  addToCart() {
    const book: Book = {
      ID:this.bookDetail.ID,
      Name: this.bookDetail.Name,
      Description: this.bookDetail.Description,
      Amount: 24.99,
      Quantity: this.quantity
    };
    this.cartService.addToCart(book);
    this.router.navigate(['/cart']);
  }

  increase() {
    if (this.quantity < 100) {
      this.quantity += 1;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }
}

import { Component } from '@angular/core';
import { SharedService } from '../utils/shared-service';
import { BookEntity, TopicEntity } from 'mj_generatedentities';
import { Metadata, RunView } from '@memberjunction/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../utils/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedData } from '../utils/shared-data';

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
  public isAdminView: boolean = false;
  public isAdmin: boolean = false;
  public bookTopics: string = '';
  public bookForm: FormGroup = new FormGroup({});
  public amount: number = 24;
  public topics: any = [];
  public categories: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private sharedData: SharedData,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.bookForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Pages: ['', Validators.required],
      BookCategoryID: ['', Validators.required],
      Amount: [0, Validators.required],
      Topics: [[], Validators.required],
      Description: ['', [Validators.required]]
    });
    this.route.params.subscribe(params => {
      let bookId = params['bookId'];
      if (bookId !== undefined && bookId !== null && !this.bookId)
        this.bookId = parseInt(bookId);

    });
    this.sharedService.setupComplete$.subscribe(isComplete => {
      if (isComplete) {
        this.loadBookDetails();
        this.topics = this.sharedData.Topics;
        this.categories = this.sharedData.BookCategories;
        const md = new Metadata();
        const admin = md.CurrentUser.UserRoles.findIndex((role) => role.RoleName === 'Developer');
        if (admin !== -1) {
          this.isAdmin = true;
          this.isAdminView = true;
        } 
          
      }
    });

  }

  async loadBookDetails() {
    const md = new Metadata();
    this.bookDetail = <BookEntity>await md.GetEntityObject('Books');
    await this.bookDetail.Load(this.bookId);
    this.bookForm.patchValue({
      Name: this.bookDetail.Name,
      Pages: this.bookDetail.Pages,
      BookCategoryID: this.bookDetail.Pages,
      Amount: this.amount,
      Topics: [],
      Description: this.bookDetail.Description
    });
    const rv = new RunView();
    const result = await rv.RunView({
      EntityName: 'Topics',
      ExtraFilter: `ID in (SELECT TOPICID from vwBookTopics WHERE BookID=${this.bookId})`
    });
    if (result.Success && result.Results.length) {
      const results: any = result.Results;
      this.bookTopics = results.map((topic: TopicEntity) => topic.Name).join(', ');
      this.bookForm.patchValue({ Topics: results.map((topic: TopicEntity) => topic.ID) });
    }
  }

  addToCart() {
    const book: Book = {
      ID: this.bookDetail.ID,
      Name: this.bookDetail.Name,
      Description: this.bookDetail.Description,
      Amount: this.amount,
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

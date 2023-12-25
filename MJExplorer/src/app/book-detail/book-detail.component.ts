import { Component, OnInit } from '@angular/core';
import { SharedService } from '../utils/shared-service';
import { BookEntity, BookTopicEntity, TopicEntity } from 'mj_generatedentities';
import { Metadata, RunView } from '@memberjunction/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../utils/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedData } from '../utils/shared-data';

export interface Book {
  ID: number;
  Name: string;
  Description: string;
  Author: string;
  Language: string;
  Quantity: number;
  Price: number;
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  public bookDetail!: BookEntity;
  public bookId!: number;
  public quantity: number = 1;
  public isAdminView: boolean = false;
  public isAdmin: boolean = false;
  public bookTopics: any[] = [];
  public bookForm: FormGroup = new FormGroup({});
  public topics: any = [];
  public categories: any = [];
  public initialBookTopics: any[] = [];
  public relatedBooks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private sharedData: SharedData,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
   this.loadInitialData();
  }

  loadInitialData(){
    this.bookForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Pages: ['', Validators.required],
      BookCategoryID: ['', Validators.required],
      Author: ['', Validators.required],
      Language: ['', Validators.required],
      Price: [0, Validators.required],
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
        }
      }
    });
  }

  async loadBookDetails() {
    const md = new Metadata();
    this.bookDetail = <BookEntity>await md.GetEntityObject('Books');
    await this.bookDetail.Load(this.bookId);
    this.loadRelatedBooks();
    this.bookForm.patchValue({
      Name: this.bookDetail.Name,
      Pages: this.bookDetail.Pages,
      BookCategoryID: this.bookDetail.BookCategoryID,
      Author: this.bookDetail.Author,
      Language: this.bookDetail.Language,
      Price: this.bookDetail.Price,
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
      this.bookTopics = results;
      this.bookForm.patchValue({ Topics: results });
    }
    const topicResult = await rv.RunView({
      EntityName: 'Book Topics',
      ExtraFilter: `BookID=${this.bookId}`
    });
    if (topicResult.Success && topicResult.Results.length) {
      const results: any = topicResult.Results;
      this.initialBookTopics = results;
    }
  }

  async loadRelatedBooks() {
    setTimeout(async () => {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Books',
        ExtraFilter: `BookCategoryId = ${this.bookDetail.BookCategoryID}`
      });
      if (result.Success) {
        this.relatedBooks = result.Results.filter((book: BookEntity) => book.ID !== this.bookId).slice(0, 4);
      }
    }, 50);
  }

  addToCart(bookDetail: BookEntity) {
    if(bookDetail.ID){
      const book: Book = {
        ID: bookDetail.ID,
        Name: bookDetail.Name,
        Description: bookDetail.Description,
        Author: bookDetail.Author,
        Language: bookDetail.Language,
        Price: bookDetail.Price,
        Quantity: this.quantity
      };
      this.cartService.addToCart(book);
      this.router.navigate(['/cart']);
    }
  }

  async saveBookDetails() {
    if (this.bookForm.valid) {
      const md = new Metadata();
      const { Name, Price, Pages, Author, Language, Description, BookCategoryID, Topics } = this.bookForm.value;
      this.bookDetail.Name = Name;
      this.bookDetail.Price = Price;
      this.bookDetail.Pages = Pages;
      this.bookDetail.Description = Description;
      this.bookDetail.Author = Author;
      this.bookDetail.Language = Language;
      this.bookDetail.BookCategoryID = BookCategoryID;
      this.bookDetail.Name = Name;
      const uncommonTopics: any[] = this.bookTopics
        .filter((topic1: TopicEntity) => !Topics.some((topic2: TopicEntity) => topic2.ID === topic1.ID))
        .map((topic1: TopicEntity) => ({ ...topic1, isAdded: false }))
        .concat(
          Topics
            .filter((topic2: TopicEntity) => !this.bookTopics.some((topic1: TopicEntity) => topic1.ID === topic2.ID))
            .map((topic2: TopicEntity) => ({ ...topic2, isAdded: true }))
        );
      this.bookTopics = Topics;
      const bookTopicEntity = <BookTopicEntity>await md.GetEntityObject('Book Topics');
      for (let i = 0; i < uncommonTopics.length; i++) {
        const topic = uncommonTopics[i];
        if (topic.isAdded) {
          bookTopicEntity.NewRecord();
          bookTopicEntity.BookID = this.bookDetail.ID;
          bookTopicEntity.TopicID = topic.ID;
          await bookTopicEntity.Save();
        } else {
          const bookTopic = this.initialBookTopics.find((item) => item.TopicID === topic.ID);
          await bookTopicEntity.Load(bookTopic.ID);
          await bookTopicEntity.Delete();
        }
      }
      await this.bookDetail.Save();
      this.sharedService.DisplayNotification('Book Details have been Saved!', 'success');
    }
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

  goToDetails(book: BookEntity) {
    if (book) {
      this.router.navigate(['book-detail', book.ID]);
      this.bookId = book.ID;
      this.loadInitialData();
    }
  }
}

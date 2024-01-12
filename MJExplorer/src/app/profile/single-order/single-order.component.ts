import { Component, Input, OnInit } from '@angular/core';
import { Metadata, RunView } from '@memberjunction/core';
import { BookEntity, PurchaseDetailEntity } from 'mj_generatedentities';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {
  @Input() public order: any;
  public books: any = [];
  public isLoading: boolean = true;

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const rv = new RunView();
    const result = await rv.RunView({
      EntityName: 'Purchase Details',
      ExtraFilter: `PurchaseID=${this.order.ID}`
    });
    if (result.Success) {
      this.isLoading = false;
      this.books = result.Results;
      this.getBookDetails(this.books);
    }
  }

  async getBookDetails(orderDetails: PurchaseDetailEntity[]) {
    const md = new Metadata();
    for (let i = 0; i < orderDetails.length; i++) {
      const order = orderDetails[i];
      const bookEntity = <BookEntity> await md.GetEntityObject('Books');
      await bookEntity.Load(order.BookID);
      this.books[i].Book = bookEntity.Name;
    }
  }
}

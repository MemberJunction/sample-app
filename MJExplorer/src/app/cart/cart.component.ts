import { Component } from '@angular/core';
import { Book } from '../book-detail/book-detail.component';
import { CartService } from '../utils/cart.service';
import { Router } from '@angular/router';
import { Metadata } from '@memberjunction/core';
import { PurchaseDetailEntity, PurchaseEntity } from 'mj_generatedentities';
import { SharedService } from '../utils/shared-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems!: Book[];
  grandTotal: number = 0;

  constructor(private cartService: CartService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateGrandTotal();
      if (!items.length) {
        this.router.navigate(['/home']);
      }
    });
  }

  async checkout() {
    const md = new Metadata();
    if (!md.CurrentUser.LinkedEntityRecordID) {
      this.router.navigate(['/cart']);
    } else {
      const purchaseEntity = <PurchaseEntity>await md.GetEntityObject('Purchases');
      purchaseEntity.NewRecord();
      purchaseEntity.Date = new Date();
      purchaseEntity.PersonID = md.CurrentUser.LinkedEntityRecordID;
      purchaseEntity.GrandTotal = this.grandTotal;
      await purchaseEntity.Save();
      for (let i = 0; i < this.cartItems.length; i++) {
        const book: Book = this.cartItems[i];
        const purchaseDetailEntity = <PurchaseDetailEntity>await md.GetEntityObject('Purchase Details')
        purchaseDetailEntity.NewRecord();
        purchaseDetailEntity.PurchaseID = purchaseEntity.ID;
        purchaseDetailEntity.BookID = book.ID;
        purchaseDetailEntity.Quantity = book.Quantity;
        purchaseDetailEntity.Amount = book.Amount;
        purchaseDetailEntity.Total = this.calculateTotal(book);
        purchaseDetailEntity.Discount = 0;
        await purchaseDetailEntity.Save();
      }
      this.sharedService.DisplayNotification('Thank you for Shopping','success');
      this.cartService.emptyCart();
    }
  }

  removeItem(book: Book) {
    this.cartService.removeFromCart(book);
  }

  decreaseQuantity(book: Book) {
    this.cartService.decreaseQuantity(book);
  }

  increaseQuantity(book: Book) {
    this.cartService.increaseQuantity(book);
  }

  calculateTotal(book: Book): number {
    return this.cartService.calculateTotal(book);
  }

  calculateGrandTotal() {
    this.grandTotal = this.cartService.calculateGrandTotal();
  }
}

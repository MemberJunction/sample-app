import { Injectable } from '@angular/core';
import { BookEntity } from 'mj_generatedentities';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book-detail/book-detail.component';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartItemsSubject = new BehaviorSubject<Book[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(book: Book) {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItemIndex = currentCartItems.findIndex((item) => item.ID === book.ID);
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...currentCartItems];
      updatedCart[existingItemIndex].Quantity += book.Quantity;
      this.cartItemsSubject.next(updatedCart);
    } else {
      const roundedBook = { ...book, Price: this.roundNumber(book.Price) };
      const updatedCart = [...currentCartItems, roundedBook];
      this.cartItemsSubject.next(updatedCart);
    }
  }


  removeFromCart(book: Book) {
    const currentCartItems = this.cartItemsSubject.value;
    const updatedCart = currentCartItems.filter((item) => item.ID !== book.ID);
    this.cartItemsSubject.next(updatedCart);
  }

  decreaseQuantity(book: Book) {
    const roundedBook = {
      ...book,
      Quantity: book.Quantity > 1 ? book.Quantity - 1 : 1, // Ensure quantity is at least 1
      Price: this.roundNumber(book.Price),
    };
    const currentCartItems = this.cartItemsSubject.value;
    const updatedCart = currentCartItems.map((item) => (item.ID === book.ID ? roundedBook : item));
    this.cartItemsSubject.next(updatedCart);
  }

  increaseQuantity(book: Book) {
    const roundedBook = {
      ...book,
      Quantity: book.Quantity + 1,
      Price: this.roundNumber(book.Price),
    };


    const currentCartItems = this.cartItemsSubject.value;
    const updatedCart = currentCartItems.map((item) => (item.ID === book.ID ? roundedBook : item));
    this.cartItemsSubject.next(updatedCart);
  }

  emptyCart() {
    this.cartItemsSubject.next([]);
  }

  private roundNumber(value: number): number {
    return Number(value.toFixed(2));
  }

  calculateTotal(book: Book): number {
    return this.roundNumber(book.Quantity * book.Price);
  }

  calculateGrandTotal(): number {
    const currentCartItems = this.cartItemsSubject.value;
    return currentCartItems.reduce((total, item) => total + this.calculateTotal(item), 0);
  }

  getCartItems() {
    return this.cartItemsSubject.value;
  }
}

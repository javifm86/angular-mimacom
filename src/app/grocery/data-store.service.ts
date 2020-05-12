import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  // Observables source
  private basketUpdatedSource = new Subject<any>();
  private paymentReceivedSource = new Subject<boolean>();

  // Observables stream
  basketUpdated$ = this.basketUpdatedSource.asObservable();
  paymentReceived$ = this.paymentReceivedSource.asObservable();

  private products: Product[];
  private basket: Product[];
  KEY_BASKET = 'basket';

  constructor() {
    this.products = [];
    this.basket = [];
  }

  setProducts(products: Product[]): void {
    this.products = [...products];
  }

  getProductsByPage(page: number, itemsPerPage: number): Product[] {
    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    return [...this.products.slice(start, end)];
  }

  getTotalProducts(): number {
    return this.products.length;
  }

  addToBasket(item: Product): void {
    const elemInBasket = this.basket.find(elem => elem.id === item.id);
    if (elemInBasket == null) {
      item.numItems = 1;
      this.basket.push(Object.assign({}, item));
      this.basketUpdatedSource.next();
    }
  }

  removeFromBasket(item: Product): void {
    this.basket = this.basket.filter(elem => elem.id !== item.id);
    this.basketUpdatedSource.next();
  }

  getBasket(): Product[] {
    return [...this.basket];
  }

  notifyPayment(): void {
    this.basket = [];
    this.basketUpdatedSource.next();
    this.paymentReceivedSource.next(true);
  }

  isProductInBasket(id: string): boolean {
    return this.basket.find(element => element.id === id) != null;
  }
}

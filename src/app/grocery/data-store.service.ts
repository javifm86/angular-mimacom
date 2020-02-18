import { Injectable } from '@angular/core';

import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private products: Product[];
  private basket: Product[];
  KEY_BASKET = 'basket';

  constructor() {
    this.basket = this.getBasketFromLocal();
    console.warn(this.basket);
  }

  setProducts(products: Product[]): void {
    this.products = products;
  }

  getProductsByPage(page: number, itemsPerPage: number): Product[] {
    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    return this.products.slice(start, end);
  }

  addToBasket(item:Product): void {
    const itemId = this.products.findIndex(el => el.id === item.id);
    this.products[itemId].stock--;

    const elemInBasket = this.basket.find((elem)=>elem.id === item.id);
    if(elemInBasket == null){
      this.basket.push(item);
      localStorage.setItem(this.KEY_BASKET, JSON.stringify(this.basket));
    }

  }

  private getBasketFromLocal(): Product[] {
    const basket = localStorage.getItem(this.KEY_BASKET);
    return basket != null ? JSON.parse(basket) : [];
  }

  getBasket(): Product[] {
    return this.basket;
  }

}

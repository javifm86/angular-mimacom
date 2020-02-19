import { Injectable } from "@angular/core";

import { Product } from "./models/product";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DataStoreService {

  // Observables source
  private basketUpdatedSource = new Subject<Product>();

  // Observables stream
  basketUpdated$ = this.basketUpdatedSource.asObservable();

  private products: Product[];
  private basket: Product[];
  KEY_BASKET = "basket";

  constructor() {
    this.basket = this.getBasketFromLocal();
    console.warn(this.basket);
  }

  setProducts(products: Product[]): void {
    this.products = [...products];
  }

  getProductsByPage(page: number, itemsPerPage: number): Product[] {
    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    return [...this.products.slice(start, end)];
  }

  addToBasket(item: Product): void {
    // const itemIndex = this.products.findIndex(el => el.id === item.id);
    // const newItem = Object.assign(
    //   {},
    //   {
    //     ...this.products[itemIndex],
    //     stock: this.products[itemIndex].stock - 1,
    //     productName: "bbbbbb"
    //   }
    // );
    // this.products = Object.assign([...this.products], { [itemIndex]: newItem });

    const elemInBasket = this.basket.find(elem => elem.id === item.id);
    if (elemInBasket == null) {
      item.numItems = 1;
      this.basket.push(item);
      sessionStorage.setItem(this.KEY_BASKET, JSON.stringify(this.basket));
      this.basketUpdatedSource.next( Object.assign({}, item) );
    }
  }

  private getBasketFromLocal(): Product[] {
    const basket = sessionStorage.getItem(this.KEY_BASKET);
    return basket != null ? JSON.parse(basket) : [];
  }

  getBasket(): Product[] {
    return [...this.basket];
  }
}

import { Injectable } from '@angular/core';

import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private products: Product[];

  constructor() { }

  setProducts(products: Product[]): void {
    this.products = products;
  }

  getProductsByPage(page: number, itemsPerPage: number): Product[] {
    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    return this.products.slice(start, end);
  }
}

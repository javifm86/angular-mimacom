import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { finalize } from "rxjs/operators";

import { GroceryService } from "../grocery.service";
import { DataStoreService } from "../data-store.service";
import { Product } from "../models/product";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  loading = true;
  error = false;
  isFavoriteList = false;
  currentPage = 0;
  products: Product[];

  private totalProducts: number;
  lastPage: number;
  private ITEMS_PER_PAGE = 12;

  @ViewChild('productList', { static: false })
  productListDom: ElementRef;

  constructor(
    private groceryService: GroceryService,
    private dataStore: DataStoreService
  ) { }

  ngOnInit(): void {
    this.loadListProduct();
    this.dataStore.paymentReceived$.subscribe((updated) => {
      this.loadListProduct();
    });

    this.dataStore.basketUpdated$.subscribe((product: Product) => {
      this.updateInBasketProducts();
    });
  }

  addedItem(item: Product) {
    this.dataStore.addToBasket(Object.assign({}, item));
    this.updateInBasketProducts();
  }

  private initPagination(): void {
    this.totalProducts = this.dataStore.getTotalProducts();
    this.lastPage = Math.ceil((this.totalProducts / this.ITEMS_PER_PAGE)) - 1;
  }

  loadPage(page: number): void {
    this.currentPage = page;
    this.getProducts();
    this.productListDom.nativeElement.scrollTop = 0;
  }

  loadListProduct(): void {
    this.currentPage = 0;
    this.loading = true;
    this.error = false;
    this.isFavoriteList = false;
    this.groceryService
      .get()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Product[]) => this.setViewData(data),
        (error: any) => this.error = true
      );
  }

  loadFavorites(): void {
    this.currentPage = 0;
    this.loading = true;
    this.error = false;
    this.isFavoriteList = true;
    this.groceryService
      .getFavorites()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Product[]) => this.setViewData(data),
        (error: any) => this.error = true
      );
  }

  refresh(): void {
    this.isFavoriteList ? this.loadFavorites() : this.loadListProduct();
  }

  private setViewData(data: Product[]): void {
    this.dataStore.setProducts(data);
    this.getProducts();
    this.initPagination();
  }

  private getProducts(): void {
     this.products = this.dataStore.getProductsByPage(
       this.currentPage,
       this.ITEMS_PER_PAGE
     );
     this.updateInBasketProducts();
  }

  private updateInBasketProducts(): void {
    this.products.map(
       elem => (elem.inBasket = this.dataStore.isProductInBasket(elem.id))
     );
  }

}

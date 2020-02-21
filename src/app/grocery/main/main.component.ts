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
  currentPage = 0;
  products: Product[];

  private totalProducts : number;
  lastPage : number;
  private ITEMS_PER_PAGE = 8;

  @ViewChild('productList', { static: false })
  productListDom: ElementRef;

  constructor(
    private groceryService: GroceryService,
    private dataStore: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.dataStore.paymentReceived$.subscribe((updated) => {
      this.getData();
    });
  }

  addedItem(item: Product) {
    this.dataStore.addToBasket(Object.assign({}, item));
  }

  private getData(): void {
    this.groceryService
      .get()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Product[]) => {
          this.dataStore.setProducts(data);
          this.products = this.dataStore.getProductsByPage(this.currentPage, this.ITEMS_PER_PAGE);
          this.initPagination();
        },
        (error: any) => {
          this.error = true;
        }
      );
  }

  private initPagination(): void {
    this.totalProducts = this.dataStore.getTotalProducts();
    this.lastPage = Math.ceil((this.totalProducts / this.ITEMS_PER_PAGE)) - 1;
  }

  loadPage(page: number): void {
    this.currentPage = page;
    this.products = this.dataStore.getProductsByPage(this.currentPage, this.ITEMS_PER_PAGE);
    this.productListDom.nativeElement.scrollTop = 0;
  }
}

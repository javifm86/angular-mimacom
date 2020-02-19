import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
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
  products : Product[];

  constructor(private groceryService: GroceryService, private dataStore: DataStoreService) {}

  ngOnInit(): void {
    this.groceryService
      .get()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (data: Product[]) => {
          this.dataStore.setProducts(data);
          this.products = this.dataStore.getProductsByPage(this.currentPage, 8);
        },
        (error: any) => {
          this.error = true;
        }
      );
  }

  addedItem(item:Product) {
    this.dataStore.addToBasket(Object.assign({},item));
  }
}

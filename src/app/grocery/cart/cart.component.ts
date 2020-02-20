import { Component, OnInit } from "@angular/core";
import { DataStoreService } from "../data-store.service";
import { Product } from "../models/product";
import { ItemUpdated } from "../../shared/product-card-basket/product-card-basket.component"
interface ProductBasket extends Product {
  numItems?: number;
  error?: boolean;
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  basket: ProductBasket[];
  total = 0;
  error = false;

  constructor(private dataStore: DataStoreService) {}

  ngOnInit(): void {
    this.updateBasket();

    this.dataStore.basketUpdated$.subscribe((product: ProductBasket) => {
      this.updateBasket();
    });
  }

  private updateBasket(): void {
    this.basket = this.dataStore.getBasket();
    this.updateTotal();
  }

  updatedNumItems(item: ItemUpdated, product: ProductBasket) {
    // TODO: update total in data store basket service ??
    product.numItems = Number(item.val);
    if(item.error){
      this.error = true;
      this.total = 0;
    }
    else {
      this.error = false;
      if(item.val === '0'){
        this.dataStore.removeFromBasket(Object.assign({}, product));
      }
      else {
        this.updateTotal();
      }
    }

  }

  private updateTotal(): void {
    this.total = this.basket.reduce((total, value) => {
      return total += value.numItems * value.price;
    }, 0);
  }
}

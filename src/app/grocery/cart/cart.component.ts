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
    if(item.error){
      product.numItems = null;
      this.error = true;
      this.total = 0;
    }
    else {
      product.numItems = item.val;
      this.updateTotal();
    }


    // console.warn('Nuevo valor: ', val);
  }

  private updateTotal(): void {
    this.total = this.basket.reduce((total, value) => {
      return total += value.numItems * value.price;
    }, 0);
  }
}

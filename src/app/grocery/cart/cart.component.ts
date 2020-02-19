import { Component, OnInit } from "@angular/core";
import { DataStoreService } from "../data-store.service";
import { Product } from "../models/product";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  basket: Product[];

  constructor(private dataStore: DataStoreService) {}

  ngOnInit(): void {
    this.updateBasket();

    this.dataStore.basketUpdated$.subscribe((product: Product) => {
      this.updateBasket();
    });
  }

  private updateBasket():void {
    this.basket = this.dataStore.getBasket();
  }
}

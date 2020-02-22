import { Component, OnInit } from "@angular/core";
import { DataStoreService } from "../data-store.service";
import { GroceryService } from "../grocery.service";
import { Product } from "../models/product";
import { ItemUpdated } from "../../shared/product-card-basket/product-card-basket.component";
import { forkJoin } from "rxjs";
import { finalize } from "rxjs/operators";
interface ProductBasket extends Product {
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
  submitting = false;

  constructor(
    private dataStore: DataStoreService,
    private groceryService: GroceryService
  ) {}

  ngOnInit(): void {
    this.updateBasket();

    this.dataStore.basketUpdated$.subscribe((product: Product) => {
      this.updateBasket();
    });
  }

  private updateBasket(): void {
    this.basket = this.dataStore.getBasket();
    this.updateTotal();
  }

  updatedNumItems(item: ItemUpdated, product: ProductBasket) {
    product.numItems = Number(item.val);
    if (item.error) {
      this.error = true;
      this.total = 0;
    } else {
      this.error = false;
      if (item.val === "0") {
        this.dataStore.removeFromBasket(Object.assign({}, product));
      } else {
        this.updateTotal();
      }
    }
  }

  private updateTotal(): void {
    this.total = this.basket.reduce((total, value) => {
      return (total += value.numItems * value.price);
    }, 0);
  }

  makePayment() {
    const arrayPetitions = [];
    this.basket.forEach(elem => {
      arrayPetitions.push(
        this.groceryService.updateProduct(elem.id, {
          stock: String(elem.stock - elem.numItems)
        })
      );
    });

    forkJoin(arrayPetitions)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe(
        response => {
          this.dataStore.notifyPayment();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DataStoreService } from '../data-store.service';
import { GroceryService } from '../grocery.service';
import { Product } from '../models/product';
import { ItemUpdated } from '../../shared/product-card-basket/product-card-basket.component';

interface ProductBasket extends Product {
  error?: boolean;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // Control variables
  error = false;
  submitting = false;

  basket: ProductBasket[];
  total = 0;

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

  // Invoked when aapp-product-card-basket component emits numItemsUpdated event
  updatedNumItems(item: ItemUpdated, product: ProductBasket) {
    const valItem = Number(item.val);

    if (item.val != null && Number.isInteger(valItem)) {
      product.numItems = valItem;
    } else {
      product.numItems = null;
    }

    product.error = item.error;
    if (!item.error) {
      if (item.val === 0) {
        this.dataStore.removeFromBasket(Object.assign({}, product));
      } else {
        this.updateTotal();
      }
    }
    this.checkErrorInBasket();
  }

  private updateTotal(): void {
    this.checkErrorInBasket();
    if (this.error) {
      return;
    }
    this.total = this.basket.reduce((total, value) => {
      return (total += value.numItems * value.price);
    }, 0);
  }

  makePayment(): void {
    this.submitting = true;
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

  private checkErrorInBasket(): void {
    this.error = this.basket.find(element => element.error === true) != null;
    if (this.error) {
      this.total = 0;
    }
  }
}

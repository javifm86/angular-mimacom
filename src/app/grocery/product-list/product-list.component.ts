import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../models/product';
import { GroceryService } from '../grocery.service';
import { NotifyService } from '../../shared/notify.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() addedProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private groceryService: GroceryService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {}

  addPressed(item: Product) {
    this.addedProduct.emit(Object.assign({}, item));
  }

  // Invoked when app-product-card component emits addedToFav event
  addedToFav(addToFav: boolean, item: Product) {
    item.favorite = addToFav ? 1 : 0;

    const params = {
      favorite: String(item.favorite)
    };

    this.groceryService.updateProduct(item.id, params).subscribe(
      (data: Product) => {
        item.favorite = data.favorite;
      },
      (error: any) => {
        item.favorite = addToFav ? 0 : 1;
        this.notifyService.notify('Error changing favorite state for the product');
      }
    );
  }
}

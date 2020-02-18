import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { Product } from "../models/product";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Output() addedProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.products) {
    //   console.warn(changes.products);
    //   console.log(this.products);
    //   return;
    // }
  }

  addPressed(item:Product) {
    this.addedProduct.emit(item);
  }

}

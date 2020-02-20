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
import { GroceryService } from "../grocery.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Output() addedProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private groceryService: GroceryService) {}

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

  addedToFav(addToFav:boolean, item:Product) {
    item.favorite = addToFav ? 1 : 0;

    const params = Object.assign({}, {
      id: item.id,
      favorite: item.favorite
    });

    this.groceryService.updateProduct(params).subscribe(
      (data: Product) => {
        item.favorite = data.favorite;
      },
      (error: any) => {
        console.error(error);
      }
    );

  }

}

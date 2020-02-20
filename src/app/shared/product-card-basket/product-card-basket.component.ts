import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { NgForm } from "@angular/forms";

export interface ItemUpdated {
  val: number;
  error: boolean;
}

@Component({
  selector: "app-product-card-basket",
  templateUrl: "./product-card-basket.component.html",
  styleUrls: ["./product-card-basket.component.scss"]
})
export class ProductCardBasketComponent implements OnInit {
  @ViewChild("productForm", { static: false })
  productForm: NgForm;

  @Input() img: string;
  @Input() stock: number;
  @Input() name: string;
  @Input() price: number;
  @Input() numItems: string;
  @Input() description: string;
  @Input() favorite: boolean;
  @Output() numItemsUpdated: EventEmitter<ItemUpdated> = new EventEmitter<ItemUpdated>();

  constructor() {}

  ngOnInit(): void {
    console.warn(this.numItems);
  }

  updatedNumItems(val): void {
    this.numItemsUpdated.emit({
      val: val,
      error: !this.productForm.valid
    });
  }

  substract(): void {
    this.modifyNumItems(-1);
  }

  add(): void {
    this.modifyNumItems(1);
  }

  private modifyNumItems(num:number): void {
    if(Number.isInteger(parseFloat(this.numItems)) ){
      this.numItems = String(Number(this.numItems) + num);
      this.updatedNumItems(this.numItems);
    }
  }
}

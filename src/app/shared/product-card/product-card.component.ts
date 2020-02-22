import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() img: string;
  @Input() stock: number;
  @Input() name: string;
  @Input() price: number;
  @Input() description: string;
  @Input() favorite: boolean;
  @Input() inBasket: boolean;
  @Output() added: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addedToFav: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  add(): void {
    this.added.emit(true);
  }

  addFav(): void {
    this.addedToFav.emit(!this.favorite);
  }
}

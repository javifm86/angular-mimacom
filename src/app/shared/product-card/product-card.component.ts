import { Component, OnInit, Input } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}
}

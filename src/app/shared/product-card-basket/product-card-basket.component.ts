import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-card-basket',
  templateUrl: './product-card-basket.component.html',
  styleUrls: ['./product-card-basket.component.scss']
})
export class ProductCardBasketComponent implements OnInit {

  @ViewChild('weightForm', { static: false })
  weightForm: NgForm;

  @Input() img: string;
  @Input() stock: number;
  @Input() name: string;
  @Input() price: number;
  @Input() numItems: number;
  @Input() description: string;
  @Input() favorite: boolean;

  constructor() { }

  ngOnInit(): void {
    console.warn(this.numItems);
  }

  updatedNumItems(val): void {
    console.warn(val);
  }

}

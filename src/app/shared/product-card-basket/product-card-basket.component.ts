import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface ItemUpdated {
  val: number;
  error: boolean;
}

@Component({
  selector: 'app-product-card-basket',
  templateUrl: './product-card-basket.component.html',
  styleUrls: ['./product-card-basket.component.scss']
})
export class ProductCardBasketComponent implements OnInit, OnChanges {
  @Input() img: string;
  @Input() stock: number;
  @Input() name: string;
  @Input() price: number;
  @Input() numItems: string;
  @Input() description: string;
  @Input() favorite: boolean;
  @Input() disabled: boolean;
  @Output() numItemsUpdated: EventEmitter<ItemUpdated> = new EventEmitter<
    ItemUpdated
  >();

  addForm: FormGroup = new FormGroup({
    itemsSelected: new FormControl()
  });

  stockLeft: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numItems) {
      const numItems = changes.numItems.currentValue;
      this.addForm.get('itemsSelected').setValue(numItems);

      if (numItems > this.stock) {
        this.stockLeft = 0;
      } else if (numItems < 0) {
        this.stockLeft = this.stock;
      } else {
        this.stockLeft = this.stock - numItems;
      }
    }
  }

  updatedNumItems(val: string): void {
    let valueItem: number = null;
    const isInteger = Number.isInteger(parseFloat(val));

    if (isInteger) {
      valueItem = Number(val);
    } else {
      this.addForm.get('itemsSelected').setValue(null);
    }

    this.numItemsUpdated.emit({
      val: valueItem,
      error: !this.addForm.valid
    });
  }

  substract(): void {
    this.modifyNumItems(-1);
  }

  add(): void {
    this.modifyNumItems(1);
  }

  private modifyNumItems(num: number): void {
    this.addForm.get('itemsSelected').markAsDirty();
    this.addForm.get('itemsSelected').markAsTouched();

    const currentVal = this.addForm.get('itemsSelected').value;
    if (Number.isInteger(parseFloat(currentVal))) {
      const result = String(Number(currentVal) + num);
      this.addForm.get('itemsSelected').setValue(result);
      this.updatedNumItems(result);
    }
  }
}

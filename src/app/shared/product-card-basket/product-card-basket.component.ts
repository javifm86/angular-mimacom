import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

export interface ItemUpdated {
  val: string;
  error: boolean;
}

@Component({
  selector: 'app-product-card-basket',
  templateUrl: './product-card-basket.component.html',
  styleUrls: ['./product-card-basket.component.scss']
})
export class ProductCardBasketComponent implements OnInit, OnChanges {

  addForm: FormGroup = new FormGroup({
    itemsSelected: new FormControl()
  });

  @Input() img: string;
  @Input() stock: number;
  @Input() name: string;
  @Input() price: number;
  @Input() numItems: string;
  @Input() description: string;
  @Input() favorite: boolean;
  @Output() numItemsUpdated: EventEmitter<ItemUpdated> = new EventEmitter<
    ItemUpdated
  >();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numItems) {
      this.addForm.get('itemsSelected').setValue(this.numItems);
    }
  }

  updatedNumItems(val): void {
    this.numItemsUpdated.emit({
      val,
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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }   from '@angular/forms';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductCardBasketComponent } from './product-card-basket/product-card-basket.component';

@NgModule({
  declarations: [ProductCardComponent, ProductCardBasketComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProductCardComponent, ProductCardBasketComponent]
})
export class SharedModule {}

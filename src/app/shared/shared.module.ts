import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }   from '@angular/forms';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductCardBasketComponent } from './product-card-basket/product-card-basket.component';
import { ValidateStockDirective } from './product-card-basket/validate-stock.directive';

@NgModule({
  declarations: [ProductCardComponent, ProductCardBasketComponent, ValidateStockDirective],
  imports: [CommonModule, FormsModule],
  exports: [ProductCardComponent, ProductCardBasketComponent]
})
export class SharedModule {}

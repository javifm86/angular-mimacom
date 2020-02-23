import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardBasketComponent } from './product-card-basket/product-card-basket.component';
import { ValidateStockDirective } from './product-card-basket/validate-stock.directive';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [ProductCardComponent, ProductCardBasketComponent, ValidateStockDirective, LoadingComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ProductCardComponent, ProductCardBasketComponent, LoadingComponent]
})
export class SharedModule {}

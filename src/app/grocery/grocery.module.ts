import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroceryRoutingModule } from './grocery-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [MainComponent, ProductListComponent, CartComponent],
  imports: [
    CommonModule,
    GroceryRoutingModule,
    SharedModule
  ]
})
export class GroceryModule { }

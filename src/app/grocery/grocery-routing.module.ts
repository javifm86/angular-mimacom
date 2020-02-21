import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes = [
  {
    path: "main",
    children: [{ path: "", component: MainComponent }]
  },
  {
    path: "cart",
    children: [{ path: "", component: CartComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryRoutingModule {}

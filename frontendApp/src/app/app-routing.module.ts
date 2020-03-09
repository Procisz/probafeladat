import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrdersComponent } from "./components/orders/orders.component";
import { UsersComponent } from "./components/users/users.component";
import { WelcomePageComponent } from "./components/welcome-page/welcome-page.component";
import { ProductsComponent } from "./components/products/products.component";

const routes: Routes = [
  {
    path: "", //4200 port defaultban.
    component: WelcomePageComponent
  },
  {
    path: "home", //4200 port defaultban.
    component: WelcomePageComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "products",
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

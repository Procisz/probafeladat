import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomePageComponent } from "./components/welcome-page/welcome-page.component";
import { UsersComponent } from "./components/users/users.component";
import { ProductsComponent } from "./components/products/products.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    UsersComponent,
    ProductsComponent,
    NavbarComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

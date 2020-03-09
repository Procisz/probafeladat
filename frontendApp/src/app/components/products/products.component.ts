import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main.service";
import { BehaviorSubject } from "rxjs";
import { Product } from "src/app/classes/product";
import { Order } from "src/app/classes/order";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  productsList$: BehaviorSubject<Product[]> = this.mainService.productsList;
  orderCodeFromDatabase;
  createdRandomOrderCode: string;
  charactersForRandomOrderCode: Array<string> = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  ];
  newOrder: Order = new Order();
  constructor(private mainService: MainService) {
    try {
      /** Read database */
      this.mainService.readTableByQuery("products", {});
    } catch (err) {
      throw err;
    }
  }

  ngOnInit(): void {}

  /** Create random unique Order Code when "Megrendelés" button pressed */
  createOrderCode(product) {
    this.createdRandomOrderCode = [...Array(8)]
      .map(
        i =>
          this.charactersForRandomOrderCode[
            (Math.random() * this.charactersForRandomOrderCode.length) | 0
          ]
      )
      .join(``);
    this.orderProduct(product);
  }

  /** Create new record in orders table */
  orderProduct(product) {
    try {
      this.newOrder.username = "Bejelentkezett felhasználó neve";
      this.newOrder.useremail = "Bejelentkezett felhasználó emailja";
      this.newOrder.productname = product.name;
      this.newOrder.ordercode = this.createdRandomOrderCode;
      this.newOrder.orderstatus = 1;
      // ev.preventDefault();
      this.mainService.createRecord("orders", this.newOrder).subscribe();
    } catch (error) {
      throw error;
    }
  }
}

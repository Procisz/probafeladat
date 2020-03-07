import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main.service";
import { BehaviorSubject } from "rxjs";
import { Product } from "src/app/classes/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  productsList$: BehaviorSubject<Product[]> = this.mainService.productsList;
  orderCodeFromDatabase;
  randomOrderCode: string;
  charactersForRandomOrderCode: Array<string> = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  ];

  constructor(private mainService: MainService) {
    try {
      this.mainService.readTableByQuery("products", {});
    } catch (err) {
      throw err;
    }
  }

  ngOnInit(): void {
    this.createOrderCode();
  }

  createOrderCode() {
    /**Create random Order Code */
    let result = [...Array(8)]
      .map(
        i =>
          this.charactersForRandomOrderCode[
            (Math.random() * this.charactersForRandomOrderCode.length) | 0
          ]
      )
      .join(``);
    console.log("Result: ", result);

    /**Check generated ordercode to any match from database */
    this.orderCodeFromDatabase = this.mainService.readTableByQuery("users", {
      selectCount: "users.ordercode",
      ordercode: "BBBB2222"
    });

    console.log(
      "orderCodesFromDatabase: ",
      this.orderCodeFromDatabase[0].result
    );
  }
}

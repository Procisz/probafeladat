import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Order } from "src/app/classes/order";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  ordersList$: BehaviorSubject<Order[]> = this.mainService.ordersList;
  searchedOrderCode: string = "";

  constructor(private mainService: MainService) {
    /** Read database */
    try {
      this.mainService.readTableByQuery("orders", {});
    } catch (err) {
      throw err;
    }
  }

  ngOnInit(): void {}

  onKey(event: KeyboardEvent) {
    this.searchedOrderCode = (event.target as HTMLInputElement).value;

    if (this.searchedOrderCode !== "") {
      try {
        this.mainService.readTableByQuery("orders", {
          where: "ordercode",
          like: this.searchedOrderCode
        });
      } catch (err) {
        throw err;
      }
    } else {
      try {
        this.mainService.readTableByQuery("orders", {});
      } catch (err) {
        throw err;
      }
    }
  }
}

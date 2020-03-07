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

  constructor(private mainService: MainService) {
    try {
      this.mainService.readTableByQuery("orders", {});
    } catch (err) {
      throw err;
    }
  }

  ngOnInit(): void {}
}

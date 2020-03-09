import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UrlConcatenatorService } from "./url-concatenator.service";
import { User } from "../classes/user";
import { Order } from "../classes/order";
import { Product } from "../classes/product";

@Injectable({
  providedIn: "root"
})
export class MainService {
  /** Api link */
  restApiURL: string = "http://localhost:3000/api";

  /** Prepare */
  users: BehaviorSubject<User[]> = new BehaviorSubject([]);
  usersList: BehaviorSubject<User[]> = new BehaviorSubject([]);
  orders: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  searchedOrders: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  ordersList: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  searchedOrderList: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  productsList: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private urlConcatenator: UrlConcatenatorService
  ) {}

  /** Create in database */
  createRecord(tableName: string, data: Object): Observable<any> {
    return this.http.post(`${this.restApiURL}/${tableName}`, data);
  }

  /** Read from database */
  readTableByQuery(tableName: string, query: Object): void {
    this.http
      .get<any>(
        `${this.restApiURL}/${tableName}/${this.urlConcatenator.getQueryString(
          query
        )}`
      )
      /** Get datas */
      .forEach(data => {
        if (tableName === "users" && query.hasOwnProperty("id")) {
          this.users.next(data[0]);
        } else if (tableName === "users") {
          this.usersList.next(data);
        }
        if (tableName === "orders" && query.hasOwnProperty("id")) {
          this.orders.next(data[0]);
        } else if (tableName === "orders") {
          this.ordersList.next(data);
        }
        /** Only for searching */
        if (tableName === "orders" && query.hasOwnProperty("id")) {
          this.searchedOrders.next(data[0]);
        } else if (tableName === "orders") {
          this.searchedOrderList.next(data);
        }
        if (tableName === "products" && query.hasOwnProperty("id")) {
          this.products.next(data[0]);
        } else if (tableName === "products") {
          this.productsList.next(data);
        }
      });
  }

  /** Update in database */
  updateRecordByQuery(
    tableName: string,
    query: Object,
    data: Object
  ): Observable<any> {
    return this.http.put(
      `${this.restApiURL}/${tableName}/${this.urlConcatenator.getQueryString(
        query
      )}`,
      data
    );
  }

  /** Delete from database */
  deleteRecordByQuery(tableName: string, query: Object): void {
    this.http
      .delete(
        `${this.restApiURL}/${tableName}/${this.urlConcatenator.getQueryString(
          query
        )}`
      )
      .forEach(done => this.readTableByQuery(tableName, {}));
  }
}

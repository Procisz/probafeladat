import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "src/app/classes/user";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  usersList$: BehaviorSubject<User[]> = this.mainService.userList;
  // usersList: User[] = [];

  // usersList$: Observable<User[]> = this.usersService.getUsers();
  // usersList: User[] = [];

  constructor(private mainService: MainService) {
    try {
      this.mainService.readTableByQuery("users", {});
      console.log(this.usersList$);
    } catch (err) {
      throw err;
    }
    // try {
    //   usersService.getUsers().subscribe(users => {
    //     this.usersList = users;
    //   });
    // } catch (err) {
    //   throw err;
    // }
  }

  onDelete(id: number): void {
    this.mainService.deleteRecordByQuery("users", { id: id });
  }

  ngOnInit(): void {}
}

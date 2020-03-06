import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "src/app/classes/user";
import { MainService } from "src/app/services/main.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  usersList$: BehaviorSubject<User[]> = this.mainService.userList;
  editedUser: User;
  newUser: User = new User();

  constructor(private mainService: MainService, private router: Router) {
    try {
      this.mainService.readTableByQuery("users", {});
      // console.log(this.usersList$);
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
  onEditUser(user: User) {
    this.editedUser = user;
    console.log("this.editedUser: ", this.editedUser);
  }

  onDelete(id: number): void {
    this.mainService.deleteRecordByQuery("users", { id: id });
  }

  ngOnInit(): void {}

  onSubmit(ev: Event): void {
    // ev.preventDefault();
    this.mainService
      .updateRecordByQuery("users", { id: this.editedUser.id }, this.newUser)
      .subscribe(() => this.ngOnInit());
  }
}

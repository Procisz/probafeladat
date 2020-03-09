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
  usersList$: BehaviorSubject<User[]> = this.mainService.usersList;
  editingUser: User = new User();
  editedUser: User = new User();
  newUser: User = new User();
  characters: Array<string> = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
  randomOrderCode: string = "BBBB2222";
  orderCodeFromDatabase;
  usersOrderCodeFiled;

  constructor(private mainService: MainService, private router: Router) {
    try {
      this.mainService.readTableByQuery("users", {});
    } catch (err) {
      throw err;
    }
    this.newUser.ordercode == "CCCC3333";
  }

  ngOnInit(): void {}

  /** Create a new user */
  onCreateUser(): void {
    try {
      // ev.preventDefault();
      this.mainService.createRecord("users", this.newUser).subscribe(() => {
        this.mainService.readTableByQuery("users", {});
      });
    } catch (error) {
      throw error;
    }
  }

  /** Edit an existing user */
  onEditUser(user: User) {
    try {
      this.editingUser = new User();
      this.editedUser = new User();
      this.editingUser = user;
      this.onUpdateUser();
    } catch (error) {
      error;
    }
  }

  /** Edit an existing user */
  onUpdateUser(): void {
    try {
      // ev.preventDefault();
      this.mainService
        .updateRecordByQuery(
          "users",
          { id: this.editingUser.id },
          this.editedUser
        )
        .subscribe(() => {
          this.mainService.readTableByQuery("users", {});
        });
    } catch (error) {
      throw error;
    }
  }

  /** Delete an existing user */
  onDeleteUser(id: number): void {
    try {
      this.mainService.deleteRecordByQuery("users", { id: id });
      this.mainService.readTableByQuery("users", {});
    } catch (error) {
      throw error;
    }
  }
}

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
  editingUser: User;
  editedUser: User = new User();
  newUser: User = new User();
  characters: Array<string> = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
  randomOrderCode: string = "BBBB2222";
  orderCodeFromDatabase;
  usersOrderCodeFiled;

  constructor(private mainService: MainService, private router: Router) {
    try {
      this.mainService.readTableByQuery("users", {});
      // console.log(this.usersList$);
    } catch (err) {
      throw err;
    }
    this.newUser.ordercode == "CCCC3333";
  }

  ngOnInit(): void {}

  /** Create a new user */
  onCreateUser(ev: Event): void {
    try {
      // ev.preventDefault();
      this.mainService.createRecord("users", this.newUser).subscribe(() => {
        this.router.navigateByUrl("/users");
      });
    } catch (error) {
      throw error;
    }
  }

  /** Edit an existing user */
  onEditUser(user: User) {
    try {
      this.editingUser = user;
    } catch (error) {
      error;
    }
  }

  /** Edit an existing user */
  onUpdateUser(ev: Event): void {
    try {
      // ev.preventDefault();
      this.mainService
        .updateRecordByQuery(
          "users",
          { id: this.editingUser.id },
          this.editedUser
        )
        .subscribe(() => this.ngOnInit());
    } catch (error) {
      throw error;
    }
  }

  /** Delete an existing user */
  onDeleteUser(id: number): void {
    try {
      this.mainService.deleteRecordByQuery("users", { id: id });
    } catch (error) {
      throw error;
    }
  }
}

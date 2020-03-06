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
  editingUser: User;
  editedUser: User = new User();
  newUser: User = new User();
  characters: Array<string> = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
  randomOrderCode: string;
  orderCodeFromDatabase;

  constructor(private mainService: MainService, private router: Router) {
    try {
      this.mainService.readTableByQuery("users", {});
      // console.log(this.usersList$);
    } catch (err) {
      throw err;
    }
  }

  onEditUser(user: User) {
    try {
      this.editingUser = user;
    } catch (error) {
      error;
    }
  }

  onCreateOrderCode(ev: Event) {}

  ngOnInit(): void {}

  onCreateUser(ev: Event): void {
    /**Create random Order Code */
    this.randomOrderCode = "CCCC3333";
    // this.randomOrderCode = [...Array(8)]
    //   .map(i => this.characters[(Math.random() * this.characters.length) | 0])
    //   .join(``);
    // console.log("Random ordercode", this.randomOrderCode);

    /**Check generated ordercode to any match from database */
    this.orderCodeFromDatabase = this.mainService.readTableByQuery("users", {
      ordercode: this.randomOrderCode
    });
    console.log("orderCodeFromDatabase: ", this.orderCodeFromDatabase);
    // if (this.randomOrderCode == this.orderCodeFromDatabase.ordercode) {
    //   console.log("Egyezik");
    // }

    try {
      this.newUser.ordercode == "CCCC3333";
      console.log("this.newUser: ", this.newUser);
      // ev.preventDefault();
      this.mainService.createRecord("users", this.newUser).subscribe(() => {
        this.router.navigateByUrl("/users");
      });
    } catch (error) {
      throw error;
    }
  }

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

  onDeleteUser(id: number): void {
    try {
      this.mainService.deleteRecordByQuery("users", { id: id });
    } catch (error) {
      throw error;
    }
  }
}

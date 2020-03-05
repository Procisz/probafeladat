import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/classes/user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  usersList$: Observable<User[]> = this.usersService.getUsers();
  usersList: User[] = [];

  constructor(private usersService: UsersService) {
    try {
      usersService.getUsers().subscribe(users => {
        this.usersList = users;
      });
    } catch (err) {
      throw err;
    }
  }

  ngOnInit(): void {}
}

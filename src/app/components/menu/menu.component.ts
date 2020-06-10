import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  appPages: any[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let email: string = localStorage.getItem("email");
    this.userService.getUserByEmail(email).then((usr) => {
      this.setUpRoutes(usr);
    });
  }

  setUpRoutes(user: User) {
    this.appPages = [
      {
        title: "Profile",
        url: `/profile/${user?.id}/user`,
        icon: "person-outline",
      },
      {
        title: "Course",
        url: `/course/${user?.course.id}`,
        icon: "book-outline",
      },
      {
        title: "Contact",
        url: "/contact-us",
        icon: "mail",
      },
    ];
  }
}

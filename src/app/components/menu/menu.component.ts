import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  user: User;
  appPages: any[];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    let email: string = localStorage.getItem("email");
    if (email !== null) {
     await this.userService.getUserByEmail(email).then((usr) => {
        this.user = usr;
      });
    }
    this.setUpRoutes();
  }

  setUpRoutes() {
    localStorage.getItem("token") === null
      ? this.pageOffline()
      : this.pageOnline();
  }

  pageOffline() {
    this.appPages = [
      {
        title: "Home",
        url: `/home`,
        icon: "person-outline",
      },
      {
        title: "Contact",
        url: "/contact-us",
        icon: "mail",
      },
      {
        title: "Login",
        url: "/login",
        icon: "exit-outline",
      },
    ];
  }

  pageOnline() {
    this.appPages = [
      {
        title: "Home",
        url: `/home`,
        icon: "home-outline",
      },
      {
        title: "Profile",
        url: `/profile/${this.user?.id}/user`,
        icon: "person-outline",
      },
      {
        title: "Course",
        url: `/course/${this.user?.course.id}`,
        icon: "book-outline",
      },
      {
        title: "Contact",
        url: "/contact-us",
        icon: "mail-outline",
      },
      {
        title: "Logout",
        url: "/logout",
        icon: "exit-outline",
      },
    ];
  }
}

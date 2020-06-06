import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../../services/course.service";
import { Router } from "@angular/router";
import { Course } from "../../../models/course.model";
import { User } from "src/app/models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.page.html",
  styleUrls: ["./course.page.scss"],
})
export class CoursePage implements OnInit {
  constructor(
    private courseService: CourseService,
    private router: Router,
    private userService: UserService
  ) {}

  private courseUsr: Course;
  private userId: number = parseInt(this.router.url.replace(/[^0-9]/g, ""));
  private mentorCourse: User;

  ngOnInit() {
    this.getUsrCourse();
  }

  getUsrCourse() {
    this.courseService.getCoursesByUserId(this.userId).then((crsusr) => {
      this.courseUsr = crsusr[0];
      this.userService.getMentorByCourseId(this.courseUsr.id).then(mnrt => this.mentorCourse = mnrt);
    });
  }
}

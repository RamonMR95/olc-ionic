import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"],
})
export class UserPage implements OnInit {
  constructor(
    private form: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  userDetails: FormGroup;
  user: User;
  idUser: number = parseInt(this.router.url.replace(/[^0-9]/g, ''));

  ngOnInit() {
    this.initForm();
    this.getDataUser();
  }

  initForm() {
    this.userDetails = this.form.group({
      nameUser: { value: "", disabled: true},
      surName: { value: "",disabled: true },
      email: { value: "", disabled: true},
      birthDate: { value: "", disabled: true},
      description: {value: "",disabled: true}
    });
  }

  async getDataUser() {
    await this.userService.getUser(this.idUser).then(usr => this.user = usr);
    this.loadUserData();
  }

  loadUserData() {
    this.userDetails.controls.nameUser.setValue(this.user.name);
    this.userDetails.controls.surName.setValue(this.user.surName);
    this.userDetails.controls.email.setValue(this.user.email);
    this.userDetails.controls.birthDate.setValue(this.user.birthDate );
    this.userDetails.controls.description.setValue(this.user.about || "");
  }

}

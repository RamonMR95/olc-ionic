import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmailContact } from "src/app/interfaces/email.contact.interface";
import { EmailService } from "src/app/services/email.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.page.html",
  styleUrls: ["./contact-us.page.scss"],
})
export class ContactUsPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      subject: ["", Validators.required],
      body: ["", Validators.required],
    });
  }

  sendMessage() {
    let msgEmail: EmailContact = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      subject: this.form.controls.subject.value,
      body: this.form.controls.body.value,
    };
    this.emailService.submitContactEmail(msgEmail).then((_) => {
      this.presentAlert().then((_) => {
        this.form.reset();
        this.router.navigate(["/home"]);
      });
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "The message was sent!!!",
      message: "We will reply you in about 24/48 Hours",
      buttons: ["OK"],
    });

    await alert.present();
  }
}

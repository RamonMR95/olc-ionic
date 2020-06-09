import { Component, OnInit } from "@angular/core";
import { AddressService } from "../../../services/address.service";
import { Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-address",
  templateUrl: "./address.page.html",
  styleUrls: ["./address.page.scss"],
})
export class AddressPage implements OnInit {
  constructor(
    private addressService: AddressService,
    private router: Router,
    private form: FormBuilder
  ) {}

  private addressDetails: FormGroup;
  private addressUsr: Address;
  private idUser: number = parseInt(this.router.url.replace(/[^0-9]/g, ''));

  ngOnInit() {
    this.initForm();
    this.getDataAddress();
  }

  initForm() {
    this.addressDetails = this.form.group({
      street: { value: "", disabled: true },
      city: { value: "", disabled: true },
      province: { value: "", disabled: true },
      zip: { value: "", disabled: true },
      country: { value: "", disabled: true },
    });
  }

  async getDataAddress() {
    await this.addressService.getAddressByUserId(this.idUser)
      .then((addr) => (this.addressUsr = addr));
    this.loadUserAddress();
  }

  loadUserAddress() {
    this.addressDetails.controls.street.setValue(this.addressUsr.street);
    this.addressDetails.controls.city.setValue(this.addressUsr.city);
    this.addressDetails.controls.province.setValue(this.addressUsr.province);
    this.addressDetails.controls.zip.setValue(this.addressUsr.zip);
    this.addressDetails.controls.country.setValue(this.addressUsr.country);
  }
}

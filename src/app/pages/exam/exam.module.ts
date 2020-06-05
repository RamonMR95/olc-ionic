import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ExamPage } from "./exam.page";
import { ExamPageRoutingModule } from "./exam-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExamPageRoutingModule],
  declarations: [ExamPage],
})
export class ExamPageModule {}

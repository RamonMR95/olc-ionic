import { Component, OnInit } from "@angular/core";
import { ExamService } from "src/app/services/exam.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { QuestionAnswer } from "src/app/interfaces/question.answer.interface";
import { User } from "src/app/models/user.model";
import { Exam } from "src/app/models/exam.model";
import { UserExam } from "src/app/models/user.exam.model";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.page.html",
  styleUrls: ["./exam.page.scss"],
})
export class ExamPage implements OnInit {
  exam: string;
  examId: number;
  questions: QuestionAnswer[] = [];
  selected: Array<any> = new Array(5);
  correctAnswers: number = 0;
  userId: number;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem("id"));
    this.examId = this.route.snapshot.params.id;
    this.getQuestionsAndAnswers(this.examId);
  }

  getQuestionsAndAnswers(examId: number) {
    this.examService.getExamByExamId(examId).then((exm) => {
      this.exam = exm.name;
      this.examService.getQuestionsAndAnswersByExamId(examId).then((exam) => {
        for (let i = 0; i < exam.length; i++) {
          let question: QuestionAnswer = {
            question: exam[i].question,
            answers: exam[i].answer,
          };
          this.questions.push(question);
        }
      });
    });
  }

  submitExam(): void {
    this.evaluateExam();
    this.confirmSubmit();
  }

  evaluateExam(): void {
    this.selected.forEach((s) => {
      if (s.correct) {
        this.correctAnswers++;
      }
    });
  }

  createExam(): void {
    let usr = new User();
    usr.id = this.userId;
    let exam = new Exam();
    exam.id = this.examId;
    let userExam = new UserExam(usr, exam, this.correctAnswers, new Date());
    this.examService.submitExam(userExam);
  }

  async showSubmitedDialog(): Promise<any> {
    const alert = await this.alertController.create({
      header: "Exam submittion",
      message: "The exam has been submitted",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async confirmSubmit(): Promise<any> {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Confirm!",
      message: "Are you sure you want to submit the exam?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Okay",
          handler: () => {
            this.createExam();
            this.showSubmitedDialog();
            // this.router.navigate(["/profile/", this.userId]);
          },
        },
      ],
    });

    await alert.present();
  }

}

import { Injectable, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  ActivatedRoute,
} from "@angular/router";
import { Observable } from "rxjs";
import { ExamService } from "../services/exam.service";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { resolve } from "url";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ExamGuard implements CanActivate {
  userId: number;
  examId: number;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    this.userId = parseInt(localStorage.getItem("id"));
    this.examId = parseInt(route.params.id);

    return new Promise<any>((resolve, reject) => {
      this.examService
        .getUserExamByUserId(this.userId, this.examId)
        .then((_) => {
          resolve(false);
          this.router.navigate(["/folder/Inbox"])
        })
        .catch((_) => {
          resolve(true);
        });
    });
  }

}
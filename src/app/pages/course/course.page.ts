import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { Observable } from 'rxjs';
import { ExamService } from 'src/app/services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  exam: Exam;
  examList: Observable<Exam[]>;
  
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getExams();
  }

  getExams() {
    let userId = parseInt(localStorage.getItem("id"));
    let courseId = this.route.snapshot.params.id;
    this.examList = this.examService.getExamsByUserIdAndCourseId(userId, courseId);
  }
  
}

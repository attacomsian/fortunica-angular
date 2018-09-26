import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionService} from '../../_services/question.service';
import {AnswerService} from '../../_services/answer.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  questions: any = [];
  loaded: boolean;

  constructor(private router: Router,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.questionService.listClientQuestions()
      .subscribe(
        data => {
          this.questions = data;
          this.loaded = true;
        }, err => {
          this.toastr.error('Unable to load thread of questions.', 'Error');
          this.loaded = true;
        });
  }
}

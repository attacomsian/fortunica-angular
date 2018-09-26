import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionService} from '../../_services/question.service';
import {AnswerService} from '../../_services/answer.service';
import {ToastrService} from 'ngx-toastr';
import {Answer} from '../../_models/answer';
import {Question} from '../../_models/question';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  questions: any = [];
  answer: Answer;
  loaded: boolean;

  constructor(private router: Router,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private toastr: ToastrService) {
    this.answer = new Answer();
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.listUserQuestions()
      .subscribe(
        data => {
          this.questions = data;
          this.loaded = true;
        }, err => {
          this.toastr.error('Unable to load thread of questions.', 'Error');
          this.loaded = true;
        });
  }

  filterQuestion(): any {
    return this.questions.filter(q => !q.answer);
  }

  addQuestion(): void {
    if (!this.answer.content || !this.answer.question) {
      return;
    }
    // add new question
    this.answerService.saveAnswer(this.answer.content, this.answer.question)
      .subscribe(
        data => {
          this.toastr.success(data.message, 'Success');
          this.answer = new Answer();
          this.loadQuestions();
        },
        err => {
          this.toastr.error('Failed to add answer. Please, try again later.', 'Error');
        });
  }
}

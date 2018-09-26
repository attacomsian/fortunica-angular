import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionService} from '../../_services/question.service';
import {AuthService} from '../../_services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Question} from '../../_models/question';

@Component({
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  questions: any = [];
  users: any = [];
  question: Question;
  loaded: boolean;

  constructor(private router: Router,
              private questionService: QuestionService,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.question = new Question();
  }

  ngOnInit() {
    // load user questions
    this.questionService.listClientQuestions()
      .subscribe(
        data => {
          this.questions = data;
          this.loaded = true;
        }, err => {
          this.loaded = true;
          this.toastr.error('Unable to load thread of questions.', 'Error');
        });
    // load all users
    this.authService.listUsers()
      .subscribe(
        data => {
          this.users = data;
        }, err => {
          this.toastr.error('Unable to load users.', 'Error');
        });
  }

  addQuestion(): void {
    if (!this.question.content || !this.question.user) {
      return;
    }
    // add new question
    this.questionService.saveQuestion(this.question.content, this.question.user)
      .subscribe(
        data => {
          this.toastr.success(data.message, 'Success');
          this.question = new Question();
          this.questions.unshift(data.question);
        },
        err => {
          this.toastr.error('Failed to add question. Please, try again later.', 'Error');
        });
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuestionService} from '../../_services/question.service';
import {AuthService} from '../../_services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  questions: any = [];
  users: any = [];
  loaded: boolean;

  constructor(private router: Router,
              private questionService: QuestionService,
              private authService: AuthService,
              private toastr: ToastrService) {
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
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AnswerService {
  // api URL
  private API_URL = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {
  }

  // list user answers
  listUserAnswers(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'user/answers');
  }

  // get answer
  getQuestion(id: String): Observable<any> {
    return this.http.get<any>(this.API_URL + 'answer/' + id);
  }

  // save answer
  saveQuestion(content: String, question: String): Observable<any> {
    return this.http.post<any>(this.API_URL + '/answer', {
      content: content,
      question: question
    });
  }
}

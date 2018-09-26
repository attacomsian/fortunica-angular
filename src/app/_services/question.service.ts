import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class QuestionService {
  // api URL
  private API_URL = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {
  }

  // list user questions
  listUserQuestions(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'user/questions');
  }

  // list client questions
  listClientQuestions(): Observable<any> {
    return this.http.get<any>(this.API_URL + 'client/questions');
  }
  
  // get question
  getQuestion(id: String): Observable<any> {
    return this.http.get<any>(this.API_URL + 'question/' + id);
  }

  // save question
  saveQuestion(content: String, user: String): Observable<any> {
    return this.http.post<any>(this.API_URL + '/question', {
      content: content,
      user: user
    });
  }
}

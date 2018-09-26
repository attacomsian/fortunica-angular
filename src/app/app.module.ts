import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './dashboard/user/user.component';
import {ClientComponent} from './dashboard/client/client.component';
import {PageNotFoundComponent} from './not-found.component';

import {FeatherIconsPipe} from './_pipes/feather-icons.pipe';
import {HtmlFormatPipe} from './_pipes/html-format.pipe';

import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './_guards/auth.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {TokenInterceptor} from './_helpers/token.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './_services/auth.service';
import {QuestionService} from './_services/question.service';
import {AnswerService} from './_services/answer.service';
import {NgMathPipesModule} from 'angular-pipes';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    UserComponent,
    ClientComponent,
    PageNotFoundComponent,
    FeatherIconsPipe,
    HtmlFormatPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMathPipesModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuard,
    AuthService,
    QuestionService,
    AnswerService,
    ToastrService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

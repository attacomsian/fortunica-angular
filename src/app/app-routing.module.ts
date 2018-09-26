import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './not-found.component';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './dashboard/user/user.component';
import {ClientComponent} from './dashboard/client/client.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {path: 'user', component: UserComponent},
      {path: 'client', component: ClientComponent},
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';
import { SettingsClientComponent } from './components/settings-client/settings-client.component';
import { PageNotFountComponent } from './components/page-not-fount/page-not-fount.component';
import { RegisterComponent } from './components/register/register.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'client/add', component: AddClientComponent },
  { path: 'client/:id', component: DetailClientComponent },
  { path: 'client/edit/:id', component: EditClientComponent },
  { path: '', component: SettingsClientComponent },
  { path: '**', component: PageNotFountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

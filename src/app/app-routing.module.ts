import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { SpentTimeComponent } from './pages/spent-time/spent-time.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageTimeComponent } from './pages/manage-time/manage-time.component';
import { PersonalBoardComponent } from './pages/personal-board/personal-board.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: 'list',
    component: ProjectListComponent,
  },
  {
    path: 'time',
    component: SpentTimeComponent,
  },
  {
    path: 'manage-time',
    component: ManageTimeComponent,
  },
  {
    path: 'personal-board',
    component: PersonalBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

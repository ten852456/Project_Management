import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { SpentTimeComponent } from './pages/spent-time/spent-time.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageTimeComponent } from './pages/manage-time/manage-time.component';
import { PersonalBoardComponent } from './pages/personal-board/personal-board.component';
import { Board } from './models/board.model';
import { ProjectBoardComponent } from './pages/project-board/project-board.component';
import { MemberComponent } from './pages/member/member.component';


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
    children: [
      {
        path: 'personal-board',
        component: PersonalBoardComponent
      },
      {
        path: 'spent-time',
        component: SpentTimeComponent
      },
      {
        path: 'manage-time',
        component: ManageTimeComponent
      },
      {
        path: 'project',
        component: ProjectBoardComponent,
      },
      {
        path: 'project/:id',
        component: ProjectBoardComponent,
      },
      {
        path: 'member',
        component: MemberComponent,
      },
      {
        path: 'list',
        component: ProjectListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

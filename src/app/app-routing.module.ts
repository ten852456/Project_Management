import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { SpentTimeComponent } from './pages/spent-time/spent-time.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
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
    path: 'help',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
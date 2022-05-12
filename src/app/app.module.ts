import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule} from '@angular/material/list'
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table'  
import { ManageTimeComponent } from './pages/manage-time/manage-time.component';
import { TaskDialogComponent } from './pages/not-found/task-dialog/task-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SpentTimeComponent } from './pages/spent-time/spent-time.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDialogComponent } from './pages/project-list/project-dialog/project-dialog/project-dialog.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TokenInterceptorService } from './services/authentication/token-interceptor.service';
import { LoginComponent } from './pages/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [AppComponent, NotFoundComponent, DashboardComponent, SpentTimeComponent, LoginComponent,ProjectDialogComponent,ManageTimeComponent,TaskDialogComponent, ProjectListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './project-dialog/project-dialog/project-dialog.component';
import { ApiServiceService } from 'src/app/api-service.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectsIncompleted:any;

  projectsCompleted:any;

  constructor(
    private api: ApiServiceService,
    public dialog: MatDialog
    ) { }

  displayedColumns: string[] = ['Name', 'Members', 'Due Date', 'symbol'];

  selected = 'inprocess';

  incompleted= '?completed=false';
  completed= '?completed=true';

  ngOnInit(): void {

    this.getProjectsIncompleted();

    this.getProjectsCompleted();
  }

  openDialog() {
    this.dialog.open(ProjectDialogComponent, {width: '50%'});
  }

  getProjectsIncompleted(){
    this.api.getProject(this.incompleted).subscribe((res: any) => { this.projectsIncompleted = res});
  }

  getProjectsCompleted(){
    this.api.getProject(this.completed).subscribe((res: any) => { this.projectsCompleted = res});
  }

}

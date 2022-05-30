import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './project-dialog/project-dialog/project-dialog.component';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectListComponent implements OnInit {

  @Output() data = new EventEmitter<any>();


  searchText: any;
  projects:any;
  allProjects:any;

  displayedColumns: string[] = ['title', 'completed', 'dueDate', 'Drive'];
  selected = '?completed=false';

  member:any;



  constructor(
    private api: ApiServiceService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getProjects();
  }


  openDialog() {
    this.dialog.open(ProjectDialogComponent, {width: '50%'});
    this.dialog.afterAllClosed
    .subscribe(() => {this.getProjects(),this.getAllProjects()});
  }


  getProjects():any{
    this.api.getProject(this.selected).subscribe((res:any) =>{this.projects = res.data,this.getMembers()});
  }

  getAllProjects():any{
    this.api.getProject("").subscribe((res:any) =>{this.allProjects = res.data,this.data.emit(this.allProjects);});
  }

  getMembers():any {
    this.api.getProjectMember(this.selected).subscribe((res:any) => {this.member = res.data});
  }



  get sortByDueDate() {
    return this.projects.sort((a: any, b: any) => {
      return <any>new Date(a.dueDate) - <any>new Date(b.dueDate);
    });
  }
}




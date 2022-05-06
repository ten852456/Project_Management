import { Component, OnInit } from '@angular/core';
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


  searchText: any;
  projects:any;
  displayedColumns: string[] = ['title', 'completed', 'dueDate', 'Drive'];
  selected = '?completed=false';



  constructor(
    private api: ApiServiceService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getProjects();
  }


  openDialog() {
    this.dialog.open(ProjectDialogComponent, {width: '50%'});
  }


  getProjects():any{
    this.api.getProject(this.selected).subscribe((res:any) =>{this.projects = res.data});
  }


}




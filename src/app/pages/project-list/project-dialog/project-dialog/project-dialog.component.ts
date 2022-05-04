import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  private projectListUrl = environment.projectListUrl;

  title: string | undefined;
  description: string | undefined;
  gitRepoUrl: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

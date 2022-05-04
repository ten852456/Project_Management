import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent implements OnInit {

  title!: string;


  constructor() { }

  ngOnInit(): void {
  }

}
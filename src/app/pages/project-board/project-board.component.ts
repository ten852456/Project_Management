import { Component, Input, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { ApiServiceService } from 'src/app/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {

  id = this.route.snapshot.queryParamMap.get('id');
  title = this.route.snapshot.queryParamMap.get('title');
  unassigned!:any;
  todo!:any;
  doing!:any;
  done!:any;
  completed!:any;
  board!: Board;

  searchText: any;

  uid = sessionStorage.getItem("uid");

  constructor(
    private api: ApiServiceService,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParamMap.subscribe(queryParams  => {
      this.ngOnInit();
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.title = this.route.snapshot.queryParamMap.get('title');

  });
  }
  

  ngOnInit(): void {
    console.log(this.id + '/' + this.title);
    this.getCards();
  }

  ngOnChanges(): void {
  }
  

  getCards() {
    this.api.getCard('?status=UNASSIGNED&project=' + this.id + '&__user=' + this.uid).subscribe((res:any) => {this.unassigned =  res.data,
      this.api.getCard('?status=TODO&project=' + this.id + '&__user=' + this.uid).subscribe((res:any) => {this.todo =  res.data,
        this.api.getCard('?status=DOING&project=' + this.id + '&__user=' + this.uid).subscribe((res:any) => {this.doing =  res.data,
          this.api.getCard('?status=DONE&project=' + this.id + '&__user=' + this.uid).subscribe((res:any) => {this.done =  res.data,
            this.api.getCard('?status=COMPLETED&project=' + this.id + '&__user=' + this.uid).subscribe((res:any) => {this.completed =  res.data, this.setBoard()});
          });
        });
      });
    });
  }

  setBoard():void {
    this.board = new Board('Test Project Board',[
      new Column('Unassigned',this.unassigned,'UNASSIGNED'),
      new Column('To do',this.todo,'TODO'),
      new Column('Doing',this.doing,'DOING'),
      new Column('Done',this.done,'DONE'),
      new Column('Completed',this.completed,'COMPLETED'),
    ]);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  replacStatus():void {
    this.board.columns.forEach(column =>  {
      column.cards.forEach(x => this.api.updateStatusCard(x.id, column.status).subscribe(res => console.log(res)))
    });
  }



}

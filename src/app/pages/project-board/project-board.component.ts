import { Component, Input, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {

  @Input() id?: number;

  unassigned!:any;
  todo!:any;
  doing!:any;
  done!:any;
  completed!:any;
  board!: Board;

  constructor(
    private api: ApiServiceService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getCards();
  }

  getCards() {
    this.api.getCard('?status=UNASSIGNED&project=' + this.id).subscribe((res:any) => {this.unassigned =  res.data,
      this.api.getCard('?status=TODO&project=' + this.id).subscribe((res:any) => {this.todo =  res.data,
        this.api.getCard('?status=DOING&project=' + this.id).subscribe((res:any) => {this.doing =  res.data,
          this.api.getCard('?status=DONE&project=' + this.id).subscribe((res:any) => {this.done =  res.data,
            this.api.getCard('?status=COMPLETED&project=' + this.id).subscribe((res:any) => {this.completed =  res.data, this.setBoard()});
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
        column.cards.forEach(x => x.status = column.status)
   });
  }



}

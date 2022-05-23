import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { ApiServiceService } from 'src/app/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardDialogComponent } from 'src/app/pages/card-dialog/card-dialog.component';



@Component({
  selector: 'app-personal-board',
  templateUrl: './personal-board.component.html',
  styleUrls: ['./personal-board.component.scss']
})
export class PersonalBoardComponent implements OnInit {

  unassigned!:any;
  todo!:any;
  doing!:any;
  done!:any;
  completed!:any;
  board!: Board;

  searchText: any;

  constructor(
    private api: ApiServiceService,
    public dialog: MatDialog,
    private router :Router,
  ) {

  }

  ngOnInit(){
    this.getCards();
  }

  getCards() {
    this.api.getCard('?status=UNASSIGNED').subscribe((res:any) => {this.unassigned =  res.data,
      this.api.getCard('?status=TODO').subscribe((res:any) => {this.todo =  res.data,
        this.api.getCard('?status=DOING').subscribe((res:any) => {this.doing =  res.data,
          this.api.getCard('?status=DONE').subscribe((res:any) => {this.done =  res.data,
            this.api.getCard('?status=COMPLETED').subscribe((res:any) => {this.completed =  res.data, this.setBoard()});
          });
        });
      });
    });
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // this.replacStatus();
    }
  }

  setBoard():void {
    this.board = new Board('Test Board',[
      new Column('Unassigned',this.unassigned,'UNASSIGNED'),
      new Column('To do',this.todo,'TODO'),
      new Column('Doing',this.doing,'DOING'),
      new Column('Done',this.done,'DONE'),
      new Column('Completed',this.completed,'COMPLETED'),
    ]);
  }

  // test(event:any) {
  //   this.api.updateCard(x.id, column.status).subscribe(res => console.log(res))
  // }

  // replacStatus():void {
  //   this.board.columns.forEach(column =>  {
  //       column.cards.forEach(x => x.status = column.status)
  //  });
  // }

  replacStatus():void {
    this.board.columns.forEach(column =>  {
      column.cards.forEach(x => this.api.updateCard(x.id, column.status).subscribe(res => console.log(res)))
    });
  }


  openDialog() {
    this.dialog.open(CardDialogComponent, {width: '50%'});
  }

  // getCradsUnassigned():any{
  //   this.api.getCrad('?status=UNASSIGNED').subscribe((res:any) => {this.unassigned =  res.data});
  // }

  // getCradsTodo():any{
  //   this.api.getCrad('?status=TODO').subscribe((res:any) => {this.todo =  res.data});
  // }

  // getCradsDoing():any{
  //   this.api.getCrad('?status=DOING').subscribe((res:any) => {this.doing =  res.data});
  // }

  // getCradsDone():any{
  //   this.api.getCrad('?status=DONE').subscribe((res:any) => {this.done =  res.data});
  // }

  // getCradsCompleted():any{
  //   this.api.getCrad('?status=COMPLETED').subscribe((res:any) => {this.completed =  res.data});
  // }


}

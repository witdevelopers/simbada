import { Component, OnInit } from '@angular/core';
import { periodWinResponse } from 'src/app/games/models/bet.model';
import { GamesService } from 'src/app/services/games/games.service';
import { PaginationEvent } from 'src/app/models/pagination-event';

@Component({
  selector: 'app-previous-periods-win',
  templateUrl: './previous-periods-win.component.html',
  styleUrls: ['./previous-periods-win.component.css']
})
export class PreviousPeriodsWinComponent implements OnInit {

  periodHistory:periodWinResponse=new periodWinResponse();

  mobileNo: string = '';
  periodNo: string = '';
  betInfo: any = [];
  noRecordsFound:boolean=false;

  pageNo:number=1
  pageSize:number=10
  recordsCount: number = 0;
  constructor(private game:GamesService) { }

  ngOnInit(): void {
    this.bindHistory();
  }

  bindHistory()
  {
    this.game.periodWinHistory(this.pageNo,this.pageSize)
    .subscribe(resp=>{
      this.periodHistory.data=resp.data;
      this.recordsCount=resp.total;
    })
  }

  paginationEvent(pe:PaginationEvent)
  {
    this.pageNo = pe.pageNo;
    this.pageSize = pe.pageSize;
    this.bindHistory();
  }
}

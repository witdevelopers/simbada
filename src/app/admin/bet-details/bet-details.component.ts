
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiUrl } from 'src/app/services/games/api-constants';
import { PaginationEvent } from 'src/app/models/pagination-event';

@Component({
  selector: 'app-bet-details',
  templateUrl: './bet-details.component.html',
  styleUrls: ['./bet-details.component.css']
})
export class BetDetailsComponent implements OnInit {

  mobileNo: string = '';
  periodNo: string = '';
  betInfo: any = [];
  noRecordsFound:boolean=false;

  pageSize: number = 100;
  pageNo: number = 1;
  recordsCount: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRecords();
  }

  BindBets() {

    this.noRecordsFound=false;

    var params = '?userId=' + this.mobileNo + '&periodNo_Display=' + this.periodNo + '&pageNumber=' + this.pageNo + '&pageSize=' + this.pageSize;

    var subscription = this.http.get<any>(ApiUrl.apiUrl + 'Dashboard/getBets' + params);

    this.betInfo = [];
    subscription.subscribe((response) => {
      //console.log(response)
      if (response.success) {
        response.data.data.forEach((element: any) => {
          var obj = {
            srno: element.srno,
            userId: element.userId,
            periodNo: element.periodNo,
            betOn: element.betOn,
            amount: element.amount,
            deduction: element.deduction,
            betAmount: element.betAmount,
            amountWinLose: element.amountWinLose,
            isWinner: element.winnerStatus
          }
          this.betInfo.push(obj);
        });
        //console.log(this.betInfo)
        this.recordsCount = response.data.recordsCount;
      }
      else {
        this.noRecordsFound=true;
      }

    });
  }

  getRecords(){
    this.pageSize=10;
    this.pageNo=1;
    this.recordsCount=0;
    this.BindBets();
  }

  paginationEvent(pe:PaginationEvent)
  {
    this.pageNo = pe.pageNo;
    this.pageSize = pe.pageSize;
    this.BindBets();
  }
}

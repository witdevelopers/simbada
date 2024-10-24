import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GamesService } from 'src/app/services/games/games.service';
import { periodWinResponse } from 'src/app/games/models/bet.model';
import { PaginationEvent } from 'src/app/models/pagination-event';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css']
})
export class UserTransactionsComponent implements OnInit {

  constructor(private game: GamesService,) { }

  pageNo: number = 1
  pageSize: number = 10
  data: any;
  total: number;
  ngOnInit(): void {
    this.getUserTransactions();
  }

  getUserTransactions() {
    this.game.getPassbook(this.pageNo, this.pageSize)
      .subscribe(resp => {
        this.data = resp.data;
        this.total = resp.total;
      })
  }

  onPageChange(e) {
    this.pageSize = e.pageSize
    this.pageNo = e.pageIndex + 1
    this.getUserTransactions()

  }

  getColor(colorName: string) {
    return colorName
  }

}

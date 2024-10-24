import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PaginationEvent } from 'src/app/models/pagination-event';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  
  pageSize: number = 10;
  pageNo: number = 1;
  maxPageNo: number = 0;
  recordsCount:number=0;
  _pageSize: number = this.pageSize;

  @Input() 
  get _recordsCount(): number { return this.recordsCount; }
  set _recordsCount(recordsCount: number) {
    this.recordsCount = recordsCount;
    this.maxPageNo=Math.ceil(this.recordsCount/this.pageSize);
  }

  @Output() paginationEvent=new EventEmitter<PaginationEvent>();

  constructor() {}

  ngOnInit(): void {
  }

  pagination(_pageSize: number, _pageNo: number) {

    this.pageNo = this.pageSize==_pageSize?_pageNo:1;
    this.pageSize = _pageSize;
    this.maxPageNo=Math.ceil(this.recordsCount/this.pageSize);

    var pe=new PaginationEvent();
    pe.pageNo=this.pageNo;
    pe.pageSize=this.pageSize;

    this.paginationEvent.emit(pe);
  }

}

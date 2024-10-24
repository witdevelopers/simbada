import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import  {UserService} from '../services/user.service'

@Component({
  selector: 'app-level-dividend',
  templateUrl: './level-dividend.component.html',
  styleUrls: ['./level-dividend.component.css']
})

export class LevelDividendComponent implements OnInit {

  directs: any = [];
  
  isPaginated: boolean = false;
  hasNextPage: boolean = false;
  pageNo: number = 1;
  pageSize: number = 10;
  pageCount: number = 0;
  
  constructor(private api: UserService) {
    this.getLeveldiveidend(this.pageNo);
  }
  // this.Level
  // level: any
  async getLeveldiveidend(pageNo: number) {

    this.  directs= [];
   
    let res = ((await this.api.levelIncome()) as any).data.table;
    
    console.log(res)

    if(res){
      this.  directs = res;
    
    }
    else{
      this.  directs = [];
    
    }
    // console.log(this.data)
  }

 ngOnInit(): void{ }


 OnPreviousClick(){
  if(this.pageNo>1)
  {
    this.pageNo--;
    this.getLeveldiveidend(this.pageNo);
  }
}

OnNextClick(){
  if(this.hasNextPage)
  {
    this.pageNo++;
    this.getLeveldiveidend(this.pageNo);
  }
}

OnPageNoChange(){
  if(this.pageNo>=1 && this.pageNo<=this.pageCount)
  {
    this.getLeveldiveidend(this.pageNo);
  }
}
}

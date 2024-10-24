import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-token-sell-history',
  templateUrl: './token-sell-history.component.html',
  styleUrls: ['./token-sell-history.component.css']
})
export class TokenSellHistoryComponent implements OnInit {

  directs: any = [];
  
  
  constructor(private api: UserService) {
    this.TokenSellHistory();
  }
  // this.Level
  // level: any
  async TokenSellHistory() {

    this.  directs= [];
   
    let res = ((await this.api.TokenSellHistory()) as any).data.table;
    
    // console.log(res)

    if(res){
      this.  directs = res;
    
    }
    else{
      this.  directs = [];
    
    }
    // console.log(this.data)
  }

 ngOnInit(): void{ }

}

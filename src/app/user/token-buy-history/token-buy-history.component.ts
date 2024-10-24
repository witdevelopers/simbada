import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-token-buy-history',
  templateUrl: './token-buy-history.component.html',
  styleUrls: ['./token-buy-history.component.css']
})
export class TokenBuyHistoryComponent implements OnInit {

  directs: any = [];
  
  
  constructor(private api: UserService) {
    this.TokenBuyHistory();
  }
  // this.Level
  // level: any
  async TokenBuyHistory() {

    this.  directs= [];
   
    let res = ((await this.api.TokenBuyHistory()) as any).data.table;
    
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

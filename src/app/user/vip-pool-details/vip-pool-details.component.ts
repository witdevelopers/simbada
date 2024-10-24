import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vip-pool-details',
  templateUrl: './vip-pool-details.component.html',
  styleUrls: ['./vip-pool-details.component.css']
})
export class VipPoolDetailsComponent implements OnInit {

  data : any= [];
  data1 : any =[];
  data2 : any =[]
 

  constructor(private api:UserService) { 
    this.GetMiningIncome()
  }
 
  async GetMiningIncome(){

    this.data=[]
   
    let res =((await this.api.VipPoolDetails()) as any)
    
    console.log("result",res)
    
    if(res && res.status){
      this.data = res.data.table;    
      this.data1 = res.data.table1;
      this.data2 = res.data.table2;
    }
    else{
      this.  data = [];   
      
    }

    
    console.log(this.data2)
    

  }
  
  ngOnInit(): void {
    
  }

}

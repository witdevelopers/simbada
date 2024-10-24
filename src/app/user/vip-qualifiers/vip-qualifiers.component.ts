import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vip-qualifiers',
  templateUrl: './vip-qualifiers.component.html',
  styleUrls: ['./vip-qualifiers.component.css']
})
export class VipQualifiersComponent implements OnInit {

  vipQualification: any = [];
  
  
  constructor(private api: UserService) {
    this.getvipQualification();
  }
  // this.Level
  // level: any
  async getvipQualification() {

    this.vipQualification= [];
   
    let res = ((await this.api.VipQualifiers()) as any).data.table;
    
    // console.log(res)

    if(res){
      this.vipQualification = res;
    
    }
    else{
      this.vipQualification = [];
    
    }
    // console.log(this.data)
  }
  ngOnInit(): void {
  }

}

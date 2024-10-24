import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ContractService } from 'src/app/services/contract.service';
import { UserService } from '../services/user.service';
import { FormControl,FormGroup ,Validators} from '@angular/forms';
// import {FormControl,FormGroup,Validators} from '@angular/forms'


@Component({
  selector: 'app-board-count',
  templateUrl: './board-count.component.html',
  styleUrls: ['./board-count.component.css'],
})
export class BoardCountComponent implements OnInit {

  BoardCount: any = [];

  BoardEntries: any = [];
  
  BoardPools:any =[];


  boardPoolForm = new FormGroup({
    poolId: new FormControl(''),
    entryId: new FormControl(''),
  });

  

  constructor(private api: UserService) {
    // this.GetBoardCount()
  }

  ngOnInit(): void {

    this.GetBoardPools()

  }
   

  // istableVisible = true ? false
  istableVisible:boolean = false;


 async GetBoardPools(){
    
    let res = (await this.api.BoardPools()) as any;

      if (res && res.status) {
      this.BoardPools = res.data.table;
      this.boardPoolForm.controls['poolId'].setValue(res.data.table[0].poolId)
      this.GetBoardEntries();
      
      console.log(res)

    } else {
      this.BoardPools = [];
    }
    console.log(this.BoardPools);

  }


  async GetBoardEntries() {

    this.BoardEntries = [];
    //console.log(this.BoardEntries)

   let poolId=this.boardPoolForm.value.poolId

   //console.log("Poolid: ", poolId)

    let res = ((await this.api.BoardEntries(poolId)) as any);
    
    //console.log("Entries result", res)

    if (res && res.status) {
      this.BoardEntries = res.data.table;
      this.boardPoolForm.controls['entryId'].setValue(res.data.table[0].entryId)
      this.GetBoardCount();
    } else {
      this.BoardEntries = [];
      this.BoardCount = [];
    }
    // console.log("Entries", this.BoardEntries);
  }



  async GetBoardCount() {
    
    this.BoardCount = [];
   
    let poolId=this.boardPoolForm.value.poolId
    let entryId=this.boardPoolForm.value.entryId
    
    console.log("entryid",entryId,poolId)

    let res = ((await this.api.BoardCount(entryId,poolId)) as any);

      console.log('get id details',res)

      // console.log(this.BoardCount)

     
    if (res && res.status) {
      this.BoardCount = res.data.table;
      this.istableVisible=true
    } else {
      this.BoardCount = [];
    }
    console.log(this.BoardCount);
  
  }

}

import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ContractService } from 'src/app/services/contract.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-board-binary-income',
  templateUrl: './board-binary-income.component.html',
  styleUrls: ['./board-binary-income.component.css']
  })
export class BoardBinaryIncomeComponent implements OnInit {
    
  BoardIncome : any = [];

  constructor(private api: UserService) {
    this.GetBoardIncome()
      
  }

  async GetBoardIncome(){

    this.BoardIncome = []

  let res = ((await this.api.BoardIncome()) as any).data.table;
      
      // console.log(await this.api.BoardIncome())

      // console.log(res)
    
      

  if(res && res.status){
    this.  BoardIncome = res;
      
  }
  else{
    this.  BoardIncome = [];
    
  }
  console.log(this.BoardIncome)

  }
  ngOnInit(): void {
  }
  
}
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from 'src/app/app-setting';
import { NgxSpinnerService } from "ngx-spinner";
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';
import { CompanyService } from 'src/app/services/company.service';
import { FundService } from '../../services/fund.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css', '../buy/buy.component.css']
})
export class SellComponent implements OnInit {

  sellAmount: number = 0;
  maticAmount: number = 0;
  tokenSymbol: string = "";
  account: any;
  tokenRate: any;

  deductionPercentage: number = 15;
  TokenBalance: number = 0;
  maticAmount_WithoutDeduction: number = 0;

  _startId: number = 0;
  constructor(private spinnerService: NgxSpinnerService, private fund: FundService, private userInfoService: UserService, private company: CompanyService, private contractService: ContractService) {
    this.tokenSymbol = Settings.coinSymbol;
    this.initialize();
  }

  ngOnInit(): void {
  }

  async initialize() {
    this.tokenRate = this.company.companyDetails.tokenRate;
    
    this.TokenBalance = Number(((await this.userInfoService.dashboard()) as any).data.table[0].totalCoins);

    // this.sellAmount = this.TokenBalance >= this.maticToToken ? this.maticToToken : this.TokenBalance;
    this.calculateMatic();
  }

  calculateMatic() {
    if (this.sellAmount > this.TokenBalance * 0.1) {
      this.deductionPercentage = 50;
    }
    else {
      this.deductionPercentage = 10;
    }
    let temp_matic = this.sellAmount - (this.sellAmount * this.deductionPercentage / 100);
    this.maticAmount = temp_matic * this.tokenRate;
    this.maticAmount_WithoutDeduction = this.sellAmount * this.tokenRate;
  }

  async sell() {
    if (this.sellAmount <= this.TokenBalance) {
      if (this.sellAmount > 0) {

        this.spinnerService.show();

        let result: any = await this.fund.sellToken(this.sellAmount);


        this.spinnerService.hide();
        // console.log(x);
        if (result.status) {
          Swal.fire({
            icon: "success",
            title: result.message
          }).then(async () => {
            await this.company.getCompanyDetails();
            this.initialize()
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            title: result.message
          });
        }

      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Enter a valid amount'
        });
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Insufficient balance!'
      });
    }
  }

  async archiveROI() {
    this.spinnerService.show();
    console.log(this._startId, Settings.roiRecordsLimit)
    let res = await this.contractService.archiveROI(sessionStorage.getItem("memberId"), parseInt(this._startId.toString()) + parseInt((Settings.roiRecordsLimit*2).toString()));
    // console.log(res);
    this.spinnerService.hide();
    if (res.success) {
      Swal.fire({
        icon: 'success',
        title: 'Archive successful!'
      }).then((res:any)=>{
        this.sell();
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: res.message
      });
    }
  }

  setAmount(percentage: number) {
    this.sellAmount = Math.floor(this.TokenBalance * percentage / 100);
    this.calculateMatic();
  }
}

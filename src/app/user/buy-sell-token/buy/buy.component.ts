import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from 'src/app/app-setting';
import { NgxSpinnerService } from "ngx-spinner";
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { FundService } from '../../services/fund.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  maticAmount: number = 0;
  tokenAmount: number = 0;
  tokenSymbol: string = "";
  account: any;
  maticToToken: any;

  MaticBalance: number = 0;
  tokenAmount_WithoutDeduction: number = 0;
  packages: any[] = []

  _startId: number = 0;
  constructor(private spinnerService: NgxSpinnerService, private api: UserService, private fund: FundService, private company: CompanyService, private contractService: ContractService) {
    this.tokenSymbol = Settings.coinSymbol;
    this.packages = this.company.packages;
    this.initialize();
  }

  ngOnInit(): void {
  }

  async initialize() {
    
    this.maticToToken = 1/this.company.companyDetails.tokenRate;
    this.MaticBalance = await this.contractService.fetchAddressBalance();

    // this.calculateTokens();
  }

  // calculateTokens() {
  //   let temp_matic = this.maticAmount * 0.4;
  //   this.tokenAmount = temp_matic * this.maticToToken;
  //   this.tokenAmount_WithoutDeduction = this.maticAmount * this.maticToToken;
  //   console.log(temp_matic, this.tokenAmount, this.tokenAmount_WithoutDeduction)
  // }

  async buy() {
    if (this.maticAmount < this.MaticBalance) {
      if (this.maticAmount > 0) {
        this.spinnerService.show();

        let receipt = await this.contractService.buyToken(this.maticAmount);

        //console.log(receipt);

        if (receipt.success) {
          let result: any = await this.fund.invest(receipt.data.transactionHash);


          this.spinnerService.hide();
          // console.log(x);
          if (result.status) {
            Swal.fire({
              icon: "success",
              title: 'Deposit successful!'
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
            title: 'Transaction failed!'
          });
        }

        this.spinnerService.hide();
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

  setAmount(pack: any) {
    this.maticAmount = pack.value;
    console.log(pack)
    // this.calculateTokens();
    
    let temp_matic = (pack.value-pack.miningAmount-pack.binaryTable) * 0.4;
    this.tokenAmount = temp_matic * this.maticToToken;
    this.tokenAmount_WithoutDeduction = (pack.value-pack.miningAmount-pack.binaryTable) * this.maticToToken;
    console.log(temp_matic, this.tokenAmount, this.tokenAmount_WithoutDeduction)
  }
}

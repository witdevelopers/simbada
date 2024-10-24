import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { FundService } from '../services/fund.service';
import { UserService } from '../services/user.service';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-withdraw-dividend',
  templateUrl: './withdraw-dividend.component.html',
  styleUrls: ['./withdraw-dividend.component.css']
})
export class WithdrawDividendComponent implements OnInit {

  withdrawalAmount: number = 0.1;
  balanceDividend: number = 0;
  amountReceived: number = 0;
  deductionPercentage: number = 15;
  selectedWallet: number = 1;

  wallets: any[] = []
  constructor(private spinnerService: NgxSpinnerService, private wallet: WalletService, private fund: FundService, private userInfoService: UserService) {
  }

  ngOnInit() {
    this.initialize();
    this.calculateAmountReceived();
  }

  async initialize() {
    let res_dashboard = ((await this.userInfoService.dashboard()) as any);
    console.log("Dashboard", res_dashboard)
    let info = res_dashboard.data.table[0];
    this.balanceDividend = Number(info.totalIncome-info.amountWithdrawn);
    //console.log(this.balanceDividend);

    let res = ((await this.wallet.getWallets()) as any);
    console.log("Wallet", res)
    this.wallets = res.table;
    this.selectedWallet = this.wallets[0].srno;
    this.onWalletChange();
    console.log(this.wallets)
  }

  async onWalletChange(){
    // console.log(((await this.wallet.getBalance(this.selectedWallet)) as any))
    this.balanceDividend = ((await this.wallet.getBalance(this.selectedWallet)) as any).balance;
  }

  max(){
    this.withdrawalAmount = this.balanceDividend;
    this.calculateAmountReceived();
  }

  async withdraw() {
    this.spinnerService.show();
    
    let result: any = await this.fund.withdrawIncome(this.withdrawalAmount);

    this.spinnerService.hide();
    // console.log(x);
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: result.message
      }).then(async () => {
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

  async calculateAmountReceived()
  {
    this.amountReceived = this.withdrawalAmount-(this.withdrawalAmount*this.deductionPercentage/100)
  }
}

import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/app-setting';
import { ContractService } from 'src/app/services/contract.service';
import { UserService } from '../services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  website:any;
  userAddress:any;
  userInfo:any;
  blockchainExplorer:any;
  contractAddress:any;
  coinName:any;
  coinSymbol:any;
  CoinPrice:any;
  sponsorAddress: any;

  constructor(private api: UserService, private company: CompanyService, private router: Router) {
   }

  ngOnInit() {
    this.CoinPrice = this.company.companyDetails.tokenRate;
    this.getUserInfo();
  }

  async getUserInfo(){
    
    this.userAddress = sessionStorage.getItem("address")!;
    
    
    
    this.website = Settings.website;
    this.blockchainExplorer = Settings.explorer;
    this.contractAddress = Settings.contractAddress;
    this.coinName = Settings.coinName;
    this.coinSymbol = Settings.coinSymbol;

    let maticToWei = Math.pow(10, 18);
    // this.userInfo = ((await this.api.dashboard()) as any).data.table[0];
    this.userInfo = ((await this.api.dashboard()) as any).data.table[0]

    this.sponsorAddress = this.userInfo.sponsorId
    
    // console.log(this.userInfo)
    // console.log("fetch dashboard",this.userInfo)
    
  }

}


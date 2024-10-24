import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Settings } from 'src/app/app-setting';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  account: any = '';
  _subscription: any;

  isDevelopment = Settings.isDevelopment;

  constructor(
    private contractService: ContractService,
    private router: Router,
    private api: AuthService,
    private spinnerService: NgxSpinnerService
  ) {
    this.getAddress();
  }

  ngOnInit(): void { }

  async getAddress() {
    this.account = await this.contractService.getAddress();
    this.account =
      this.account != undefined && this.account != null ? this.account : '';
    this._subscription = this.contractService.accountChange.subscribe(
      (value) => {
        this.account = value != undefined && value != null ? value : '';
      }
    );
  }

  async connect() {
    await this.getAddress();
  }

  async login() {
    this.spinnerService.show();
    let signature = await this.contractService.signMessage(
      'Do you want to login?'
    );
    console.log(signature)
    if (signature) {
      var res: any = await this.api.login(this.account, signature);
      //console.log(x);
      if (res.status) {
        sessionStorage.setItem('address', this.account);
        sessionStorage.setItem('token', res.data);

        this.spinnerService.hide();
        if (res.isAdmin) {
          this.router.navigate(['user/dashboard']);
        }
        else {
          this.router.navigate(['user/dashboard']);
        }
      } else {
        this.spinnerService.hide();
        Swal.fire(res.message, '', 'error');
      }
    }
  }

  async demoLogin() {
    let signature = "0x178943b072a5995ac19543a9260784b348ed134a9e1f7b9ace8b3b335374ea0a3ebf2cc6277b182af7b7372eb378c7dabdf2e8ced89b32652aa081ff9564a9211c";
    let address = "0xc819f1792890c7253490d73fe0d9a395a4a52527"
    var res: any = await this.api.login(address, signature);
    //console.log(x);
    if (res.status) {
      sessionStorage.setItem('address', address);
      sessionStorage.setItem('token', res.data);

      this.spinnerService.hide();
      if (res.isAdmin) {
        this.router.navigate(['admin/dashboard']);
      }
      else {
        this.router.navigate(['user/dashboard']);
      }
     
    } else {
      this.spinnerService.hide();
      Swal.fire(res.message, '', 'error');
    } 
  }

  async adminLogin() {
    let signature = "0xa7a2a56015a1573d2ac9ba8fcbec90e0bb18e8f5680ff05b19651014cdd63b5f682a1450a3ce35f649f2c5200ff636ae75187926992e508176400ca18d37af0f1b";
    let address = "0x950Dd693707f50F36F569e4AE3e18271987152d5"
    var res: any = await this.api.login(address, signature);
    //console.log(x);
    if (res.status) {
      sessionStorage.setItem('address', address);
      sessionStorage.setItem('token', res.data);

      this.spinnerService.hide();
      this.router.navigate(['admin/dashboard']);
    } else {
      this.spinnerService.hide();
      Swal.fire(res.message, '', 'error');
    }
  }

  registerClick() {
    this.router.navigate(['auth/register']);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}

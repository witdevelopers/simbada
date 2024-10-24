import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { AuthMasterComponent } from './auth/auth-master/auth-master.component';
import { LoginComponent } from './auth/login/login.component';
import { UserMasterComponent } from './user/user-master/user-master.component';
import { RegisterComponent } from './auth/register/register.component';
import { DirectsComponent } from './user/directs/directs.component';
import { RankComponent } from './user/rank/rank.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { BuySellMasterComponent } from './user/buy-sell-token/buy-sell-master/buy-sell-master.component';
import { BuyComponent } from './user/buy-sell-token/buy/buy.component';
import { SellComponent } from './user/buy-sell-token/sell/sell.component';
import { ContractService } from './services/contract.service';
import { WithdrawDividendComponent } from './user/withdraw-dividend/withdraw-dividend.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LevelDividendComponent } from './user/level-dividend/level-dividend.component';
import { RoiDividendComponent } from './user/roi-dividend/roi-dividend.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransactionsComponent } from './user/transactions/transactions.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { CompanyService } from './services/company.service';
import { DailyEORComponent } from './user/daily-eor/daily-eor.component';
import { BoardBinaryIncomeComponent } from './user/board-binary-income/board-binary-income.component';

import { MiningIncomeComponent } from './user/mining-income/mining-income.component';
import { MineComponent } from './user/mine/mine.component';
import { BoardCountComponent } from './user/board-count/board-count.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { VipPoolDetailsComponent } from './user/vip-pool-details/vip-pool-details.component';
import { TokenBuyHistoryComponent } from './user/token-buy-history/token-buy-history.component';
import { TokenSellHistoryComponent } from './user/token-sell-history/token-sell-history.component';
import { IncomeWithdrawalHistoryComponent } from './user/income-withdrawal-history/income-withdrawal-history.component';
import { VipQualifiersComponent } from './user/vip-qualifiers/vip-qualifiers.component';
import { PrizePoolComponent } from './user/prize-pool/prize-pool.component';
import { BreakingnewsComponent } from './user/breakingnews/breakingnews.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthMasterComponent,
    LoginComponent,
    ValidationMessageComponent,
    RegisterComponent,
    UserMasterComponent,
    DirectsComponent,
    RankComponent,
    BuySellMasterComponent,
    BuyComponent,
    SellComponent,
    WithdrawDividendComponent,
    DashboardComponent,
    LevelDividendComponent,
    RoiDividendComponent,
    PageNotFoundComponent,
    TransactionsComponent,
    PriceChartComponent,
    DailyEORComponent,
    BoardBinaryIncomeComponent,
    MiningIncomeComponent,
    MineComponent,
    BoardCountComponent,
    VipPoolDetailsComponent,
    TokenBuyHistoryComponent,
    TokenSellHistoryComponent,
    IncomeWithdrawalHistoryComponent,
    VipQualifiersComponent,
    PrizePoolComponent,
    BreakingnewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  providers: [
    { provide: 'Window',  useValue: window },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: APP_INITIALIZER, useFactory: (config: CompanyService) => () => config.getCompanyDetails(), deps: [CompanyService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private contractService:ContractService){
    
  }

 }

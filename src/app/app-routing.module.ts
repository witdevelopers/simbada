import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthMasterComponent } from './auth/auth-master/auth-master.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { BuySellMasterComponent } from './user/buy-sell-token/buy-sell-master/buy-sell-master.component';
import { BuyComponent } from './user/buy-sell-token/buy/buy.component';
import { SellComponent } from './user/buy-sell-token/sell/sell.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { DirectsComponent } from './user/directs/directs.component';
import { LevelDividendComponent } from './user/level-dividend/level-dividend.component';
import { RankComponent } from './user/rank/rank.component';
import { RoiDividendComponent } from './user/roi-dividend/roi-dividend.component';
import { TransactionsComponent } from './user/transactions/transactions.component';
import { UserMasterComponent } from './user/user-master/user-master.component';
import { WithdrawDividendComponent } from './user/withdraw-dividend/withdraw-dividend.component';
import { BoardBinaryIncomeComponent } from './user/board-binary-income/board-binary-income.component';
import { DailyEORComponent } from './user/daily-eor/daily-eor.component';
import { MiningIncomeComponent } from './user/mining-income/mining-income.component';
import { BoardCountComponent } from './user/board-count/board-count.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { BetDetailsComponent } from './admin/bet-details/bet-details.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { TokenBuyHistoryComponent } from './user/token-buy-history/token-buy-history.component';
import { TokenSellHistoryComponent } from './user/token-sell-history/token-sell-history.component';
import { IncomeWithdrawalHistoryComponent } from './user/income-withdrawal-history/income-withdrawal-history.component';
import { VipQualifiersComponent } from './user/vip-qualifiers/vip-qualifiers.component';
import { VipPoolDetailsComponent } from './user/vip-pool-details/vip-pool-details.component';


const routes: Routes = [
  {
    path: '',
    component: AuthMasterComponent,
    children: [{
      path: '',
      component: LoginComponent
    }]
  },
  {
    path: 'auth',
    component: AuthMasterComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'register/:id',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./admin/admin.module").then((u) => u.AdminModule),
      }
    ]
  },
  {
    path: 'user',
    component: UserMasterComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'directs',
        component: DirectsComponent
      },
      {
        path: 'rank',
        component: RankComponent
      },
      {
        path: 'boardIncome',
        component: BoardBinaryIncomeComponent
      },
      {
        path: 'dailyeor',
        component: DailyEORComponent
      },
      {
        path: 'miningIncome',
        component: MiningIncomeComponent
      },
      {
        path: 'boardCount',
        component: BoardCountComponent
      },
      {
        path: 'vip',
        component: VipQualifiersComponent
      },
      {
        path: 'vipPool',
        component : VipPoolDetailsComponent
      },
      {
        path: 'token',
        component: BuySellMasterComponent,
        children: [
          {
            path: '',
            component: BuyComponent
          },
          {
            path: 'buy',
            component: BuyComponent
          },
          {
            path: 'sell',
            component: SellComponent
          }
        ]
      },
      {
        path: 'withdraw-dividend',
        component: WithdrawDividendComponent
      },
      {
        path: 'level-dividend',
        component: LevelDividendComponent
      },
      {
        path: 'roi-dividend',
        component: RoiDividendComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'chart',
        component: PriceChartComponent
      },
      {
        path:'token-buy-history',
        component:TokenBuyHistoryComponent
      },
      {
        path:'token-sell-history',
        component:TokenSellHistoryComponent
      },
      {
        path:'income-withdrawal-history',
        component:IncomeWithdrawalHistoryComponent
      },
      {
        path: "games",
        children: [
          {
            path: "",
            loadChildren: () => import("./games/games.module").then((u) => u.GamesModule),
          },
        ]
      },
     
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

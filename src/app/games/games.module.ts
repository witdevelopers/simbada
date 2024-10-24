import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamesRoutingModule } from './games-routing.module';
import { ColorGameComponent } from './components/color-game/dashboard/color-game-dashboard.component';
import { SpinGameComponent } from './components/spin-game/spin-game.component';
import { UserPaginationComponent } from '../shared/pagination/pagination.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PeriodWinHistoryComponent } from './components/color-game/period-win-history/period-win-history.component';
import { RuleComponent } from './components/color-game/rule-dialog/rule.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AddBetComponent } from './components/color-game/add-bet-dialog/add-bet.component';
import { PeriodWinModalComponent } from './components/color-game/period-win-dialog/period-win-modal.component';
import { SharedModule } from '../shared/shared.module';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { CustomDatePipe } from '../pipes/date.pipe';


@NgModule({
  declarations: [GameListComponent,ColorGameComponent,SpinGameComponent,UserPaginationComponent,
    PeriodWinHistoryComponent, RuleComponent, AddBetComponent, PeriodWinModalComponent,UserTransactionsComponent
    ,CustomDatePipe ],
  
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    GamesRoutingModule,
    SharedModule
  ],
  exports:[
  ],
})
export class GamesModule { }

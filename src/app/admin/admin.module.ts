import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { BetDetailsComponent } from "./bet-details/bet-details.component";
import { PreviousPeriodsWinComponent } from "./previous-periods-win/previous-periods-win.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { CurrencySymbolPipe } from "../pipes/currency-symbol.pipe";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    BetDetailsComponent,
    PreviousPeriodsWinComponent,
    AdminDashboardComponent,
    PaginationComponent,
    CurrencySymbolPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports:[
   
  ],
  
})
export class AdminModule { }

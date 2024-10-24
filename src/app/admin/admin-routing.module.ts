import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BetDetailsComponent } from './bet-details/bet-details.component';

const routes: Routes = [
    {
      path: '',
      component: AdminDashboardComponent,
      //canActivate: [AuthGuardAdmin],
      data: { title: 'Dashboard' }
    },
    {
      path: 'dashboard',
      component: AdminDashboardComponent,
      //anActivate: [AuthGuardAdmin],
      data: { title: 'Dashboard' }
    },
    {
      path: 'bet-details',
      component: BetDetailsComponent,
      //canActivate: [AuthGuardAdmin],
      data: { title: 'Bet details' }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

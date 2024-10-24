import { NgModule } from '@angular/core';
import {  CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BetComponent } from '../games/components/color-game/bet/bet.component';


@NgModule({
  declarations: [BetComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  exports:[
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    BetComponent
  ],
  providers:[
    DatePipe
  ]
})
export class SharedModule { }

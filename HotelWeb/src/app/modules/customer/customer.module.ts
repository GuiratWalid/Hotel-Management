import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { NgZorroAntdModule } from '../../NgZorroAntdModule';
import { FormsModule } from '@angular/forms';
import { BookingsComponent } from './components/bookings/bookings.component';


@NgModule({
  declarations: [
    CustomerComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class CustomerModule { }

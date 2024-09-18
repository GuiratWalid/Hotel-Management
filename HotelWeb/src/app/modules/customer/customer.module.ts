import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { NgZorroAntdModule } from '../../NgZorroAntdModule';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class CustomerModule { }

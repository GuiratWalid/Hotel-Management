import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomsComponent } from '../customer/components/rooms/rooms.component';
import { PostRoomComponent } from './components/post-room/post-room.component';
import { NgZorroAntdModule } from '../../NgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateRoomComponent } from './components/update-room/update-room.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    RoomsComponent,
    PostRoomComponent,
    UpdateRoomComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { BookingsComponent } from './components/bookings/bookings.component';

const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '**', redirectTo: 'rooms'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

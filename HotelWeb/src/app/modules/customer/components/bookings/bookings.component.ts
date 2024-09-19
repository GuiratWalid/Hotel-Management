import { Component } from '@angular/core';
import { Reservation } from '../../../../dto/reservation';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

  currentPage: any = 1;
  total: any;
  bookings: Reservation[] = [];
  loading_page = true;
  userId: number = 0;

  constructor(private customerService: CustomerService,
    private message: NzMessageService
  ){
    if(typeof localStorage !== 'undefined')
      this.getReservations();
  }

  getReservations(){
    this.userId = UserStorageService.getUserId();
    this.customerService.getBookings(this.userId, this.currentPage - 1).subscribe(res => {
      this.bookings = res.reservationDtoList;
      this.total = res.totalPages;
      this.loading_page = false;
    }, error => this.message.error(error.error, {nzDuration: 5000})
    );
  }

  pageIndexChange(value: any){
    this.currentPage = value;
    this.getReservations();
  }

}

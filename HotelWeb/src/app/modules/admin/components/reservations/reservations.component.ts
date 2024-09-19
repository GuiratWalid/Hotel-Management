import { Component } from '@angular/core';
import { Reservation } from '../../../../dto/reservation';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  currentPage: any = 1;
  total: any;
  reservations: Reservation[] = [];
  loading_page = true;

  constructor(private adminService: AdminService,
    private message: NzMessageService
  ){
    if(typeof localStorage !== 'undefined')
      this.getReservations();
  }

  getReservations(){
    this.adminService.getReservations(this.currentPage - 1).subscribe(res => {
      console.log(res);
      this.reservations = res.reservationDtoList;
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

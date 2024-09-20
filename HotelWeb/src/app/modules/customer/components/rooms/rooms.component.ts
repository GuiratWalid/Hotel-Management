import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Room } from '../../../../dto/room';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';
import { Reservation } from '../../../../dto/reservation';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {


  currentPage = 1;
  rooms: Room[] = [];
  total: any;
  loading_skeleton = false;
  loading_page = true;

  constructor(private customerService: CustomerService,
    private message: NzMessageService,
    private modalService: NzModalService
  ){
    if(typeof localStorage !== 'undefined')
      this.getAvailableRooms();
  }

  getAvailableRooms(){
    this.customerService.getAvailableRooms(this.currentPage - 1).subscribe(res => {
      console.log(res)
      this.rooms = res.roomDtoList;
      this.total = res.totalPages;
      this.loading_skeleton = false;
      this.loading_page = false;
    }, error => this.message.error(error.error, {nzDuration: 5000})
    );
  }

  pageIndexChange(value: any){
    this.loading_skeleton = true;
    this.currentPage = value;
    this.getAvailableRooms();
  }

  // Booking 
  isVisibleMiddle = false;
  date: Date[] = [];
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  id: number = 0;

  onChange(result: Date[]){
    if(result.length === 2){
      this.checkInDate = result[0];
      this.checkOutDate = result[1];
    }
  }

  handleCancelMiddle(){
    this.isVisibleMiddle = false;
  }

  handleOkMiddle(): void {
    const reservationDto: Reservation = {
      userId: UserStorageService.getUserId(),
      roomId: this.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      id: 0,
      price: null,
      reservationStatus: null,
      roomType: null,
      roomName: null,
      username: null
    };
    this.isVisibleMiddle = false;
    this.customerService.bookRoom(reservationDto).subscribe(res => {
      this.message.success(
        "Request submitted for approval !",
        {nzDuration: 5000}
      )
    }, error => this.message.error(error.error,{nzDuration: 5000})
    );
  }

  showModalMiddle(id: number){
    this.id = id;
    this.isVisibleMiddle = true;
  }

}

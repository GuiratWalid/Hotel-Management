import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Room } from '../../dto/room';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  currentPage = 1;
  rooms: Room[] = [];
  total: any;
  loading_skeleton = false;
  loading_page = true;

  constructor(private adminService: AdminService,
    private message: NzMessageService,
    private modalService: NzModalService
  ){
    if(typeof localStorage !== 'undefined')
      this.getRooms();
  }

  getRooms(){
    this.adminService.getRooms(this.currentPage - 1).subscribe(res => {
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
    this.getRooms();
  }

  show_confirmation(roomId: number){
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete this room ?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.deleteRoom(roomId)
    });
  }

  deleteRoom(roomId: number){
    this.adminService.deleteRoom(roomId).subscribe(res => {
      this.message.success(
        "Room deleted successfully !",
        {nzDuration: 5000}
      );
      //this.loading_page = true;
      this.getRooms();
    }, error => this.message.error(error.error, {nzDuration: 5000})
    );
  }

}

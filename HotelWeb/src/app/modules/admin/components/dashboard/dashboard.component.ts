import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Room } from '../../dto/room';

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

}

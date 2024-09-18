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
  loading = true;

  constructor(private adminService: AdminService,
    private message: NzMessageService,
  ){
    if(typeof localStorage !== 'undefined')
      this.getRooms();
  }

  getRooms(){
    this.adminService.getRooms(this.currentPage - 1).subscribe(res => {
      console.log(res);
      this.rooms = res.roomDtoList;
      this.total = res.totalPages;
      this.loading = false;
    })
  }

  pageIndexChange(value: any){
    this.loading = true;
    this.currentPage = value;
    this.getRooms();
  }

}

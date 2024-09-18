import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent {

  updateRoomForm: FormGroup;
  id: number = 0;

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      available: [true, Validators.required],
    });
    if(typeof localStorage !== 'undefined')
      this.getRoomById();
  }

  submitForm(){
    this.adminService.updateRoom(this.id, this.updateRoomForm.value).subscribe(res => {
      console.log(res);
      this.message.success(
        "Room updated successfully !",
        {nzDuration: 5000}
      );
      this.router.navigateByUrl("/admin/dashboard");
      }, error => this.message.error(error.error, {nzDuration: 5000})
    )
  }

  getRoomById(){
    this.adminService.getRoomById(this.id).subscribe(res => {
      this.updateRoomForm.patchValue(res);
    }, error => this.message.error(error.error, {nzDuration: 5000})
    )
  }

}

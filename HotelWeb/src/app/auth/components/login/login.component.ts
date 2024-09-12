import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NgZorroAntdModule } from '../../../NgZorroAntdModule';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: [null,[Validators.email, Validators.required]],
      password: [null, Validators.required]
    })
  }

  submitForm(){
    this.authService.login(this.loginForm.value).subscribe(res => {
      if (res.id != null){
        this.message.success("Login successfully !", {nzDuration: 5000});
      } else{
        this.message.error("Bad credentials !", {nzDuration: 5000});
      }
    },
    err => this.message.error("Bad credentials !", {nzDuration: 5000})
  )
  }

}

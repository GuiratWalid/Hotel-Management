import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZorroAntdModule } from '../../../NgZorroAntdModule';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgZorroAntdModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ){}

  ngOnInit(){
    this.registerForm = this.fb.group({
      email: [null,[Validators.email, Validators.required]],
      password: [null, Validators.required],
      name: [null, Validators.required]
    })
  }

  submitForm(){
    this.authService.register(this.registerForm.value).subscribe(res => {
      console.log("Walid")
      console.log(res);
      if (res.id != null){
        this.message.success("Signup successfully !", {nzDuration: 5000});
        this.router.navigateByUrl("/");
      } else{
        this.message.error(res.message, {nzDuration: 5000});
      }
    },
    err => this.message.error(err.error, {nzDuration: 5000})
  )
  }

}

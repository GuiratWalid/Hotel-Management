import { afterNextRender, Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgZorroAntdModule } from './NgZorroAntdModule';
import { UserStorageService } from './auth/services/storage/user-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgZorroAntdModule,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HotelWeb';


  isCustomerLoggedIn: boolean = (typeof localStorage !== 'undefined')? UserStorageService.isCustomerLoggedIn() : false;
  isAdminLoggedIn: boolean = (typeof localStorage !== 'undefined')? UserStorageService.isAdminLoggedIn() : false;

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.isCustomerLoggedIn = (typeof localStorage !== 'undefined')? UserStorageService.isCustomerLoggedIn() : false;
        this.isAdminLoggedIn = (typeof localStorage !== 'undefined')? UserStorageService.isAdminLoggedIn() : false;
      }
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('/');
  }

}

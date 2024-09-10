import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgZorroAntdModule } from './NgZorroAntdModule';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgZorroAntdModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HotelWeb';
}

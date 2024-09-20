import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { customerGuard } from './guards/customer/customer.guard';
import { adminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path:'',
    component: LoginComponent,
  },
  { 
    path: 'customer',
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
    canActivate: [customerGuard]
  },
  { 
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard]
  },
  { 
    path: '**',
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

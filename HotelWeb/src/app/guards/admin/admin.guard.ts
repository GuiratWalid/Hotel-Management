import { CanActivateFn, Router } from '@angular/router';
import { UserStorageService } from '../../auth/services/storage/user-storage.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if((typeof localStorage !== 'undefined') && UserStorageService.isAdminLoggedIn()) // If admin is loggedIn
    return true; // Allow route access

  if((typeof localStorage !== 'undefined') && UserStorageService.isCustomerLoggedIn()) // If customer is loggedIn
    router.navigateByUrl("/customer/rooms");
  else // If no one is loggedIn
    router.navigateByUrl("/");
  return false; // Deny route access
};

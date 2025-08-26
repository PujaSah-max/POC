import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getUserRole();


  if (userRole == null) return false;
  if (authService.isLoggedIn() && allowedRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['/signup']);
    return false;
  }


};

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiresGuest = route.data['requiresGuest'];

  if (authService.isLoggedIn()) {
    const user = authService.getCurrentUser();
    const requiredRole = route.data['role'];

    // If this is the public landing page and user is logged in
    if (requiresGuest) {
      if (user?.userType === 'PATIENT') {
        router.navigate(['/patient/home']);
      } else if (user?.userType === 'STAFF') {
        router.navigate(['/staff/dashboard']);
      }
      return false;
    }

    // For protected routes, check role
    if (!requiredRole || user?.userType === requiredRole) {
      return true;
    }
    
    // Wrong role, redirect to appropriate home
    if (user?.userType === 'PATIENT') {
      router.navigate(['/patient/home']);
    } else if (user?.userType === 'STAFF') {
      router.navigate(['/staff/dashboard']);
    }
    return false;
  }

  // Not logged in, but trying to access public landing
  if (requiresGuest) {
    return true;
  }

  // Not logged in, redirect to login
  router.navigate(['/login']);
  return false;
}; 
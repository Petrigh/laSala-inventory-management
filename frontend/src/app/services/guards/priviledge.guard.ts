import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const priviledgeGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('userToken');
  if (token) {
    try {
      const priv = JSON.parse(token);
      if(priv.token == "admin")
        return true;
      throw('not Admin');
    } catch (e) {
        router.navigate(['/welcome']);
        return false;
    }
  }
  router.navigate(['/welcome']);
  return false;
}

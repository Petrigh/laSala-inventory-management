import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isLoggedIn$.pipe(
    take(1),
    map(isIn => {
      if(isIn)
        return isIn
      router.navigate(['/welcome']);
      return false;
    })
  )
};

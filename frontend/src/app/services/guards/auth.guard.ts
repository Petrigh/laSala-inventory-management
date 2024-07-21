import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const loggedInToken = localStorage.getItem('userToken');
  if(loggedInToken != null){
    return true;
  }else{
    router.navigate(['/welcome']);
    return false;
  }
};

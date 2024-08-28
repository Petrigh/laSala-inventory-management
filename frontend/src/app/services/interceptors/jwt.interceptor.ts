import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(environment.jwt);
  if(token){
    const bearer = req.clone({
      headers: req.headers.set("Authorization",
        "Bearer " + token)
    });
    return next(bearer);
  }
  return next(req);
}
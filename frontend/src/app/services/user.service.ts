import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Credentials, TokenInterface } from '../shared/credentials';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from './../../enviroments/enviroment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem(environment.jwt);
    if (token) {
      const payload = jwtDecode<TokenInterface>(token);
      this.isAdminSubject.next(payload.rol == "ADMINISTRADOR");
    }
    this.isLoggedInSubject.next(!!token);
  }

  getUsername(): string {
    const token = localStorage.getItem(environment.jwt);
    if (token) {
      const payload = jwtDecode<TokenInterface>(token);
      return payload.nombre;
    }
    return '';
  }


  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.JWT) {
          var token: string = response.JWT.string;
          localStorage.setItem(environment.jwt, token.replace(/^"|"$/g, ''));
          this.checkLoginStatus();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.logout();
        return throwError({
          status: error.status,
          message: error?.error?.error?.string || 'Error del servidor: Intente mas tarde'
        });
      })
    );
  }

  logout(): void {
    localStorage.removeItem(environment.jwt);
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }
}
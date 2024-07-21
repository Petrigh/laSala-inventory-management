import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Credentials, Token, UserToken } from '../shared/credentials';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private apiUrl = 'https://your-api.com';

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const priv = JSON.parse(token);
        this.isAdminSubject.next(priv.token == "admin");
      } catch (e) {
        this.isAdminSubject.next(false);
      }
    }
    this.isLoggedInSubject.next(!!token);
  }


  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  storeUserCredential(token: Token, member?: boolean){
    let userToken: UserToken = {username: token.usr ,token: token.token, expiry:null};
    this.isAdminSubject.next(token.token == "admin");

    if(!member){
      const now = new Date();
      const sessionTime = 10; //Sesion de 10 min
      userToken.expiry = now.getTime() + 1000 * 60 * sessionTime; 
    }
    localStorage.setItem('userToken', JSON.stringify(userToken));
  }

  getWithExpiry() {
    const itemStr = localStorage.getItem('userToken');
    if (itemStr) {
      const item = JSON.parse(itemStr);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        this.logout();
      }
    }
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('userToken', response.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }

  getToken(): string | null {
    const tokenString = localStorage.getItem('userToken');
    if (tokenString) {
      try {
        return JSON.parse(tokenString).token;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  getUsername(): string | null {
    const tokenString = localStorage.getItem('userToken');
    if (tokenString) {
      try {
        return JSON.parse(tokenString).username;
      } catch (e) {
        return null;
      }
    }
    return null;
  }


  // MOCK Credentials
  users: Array<Credentials> = [
    {username: "Chef", password: "abc123"},
    {username: "SousChef", password: "abc123"},
    {username: "Patissier", password: "abc123"},
    {username: "LavaPlatos", password: "abc123"},
  ]

  roles: Array<Token> = [
    {usr: "Chef", token: "admin"},
    {usr: "SousChef", token: "admin"},
    {usr: "Patissier", token: "colab"},
    {usr: "LavaPlatos", token: "colab"},
  ]

  loginMock(credentials: Credentials, member?: boolean): Observable<any>  {
    return new Observable(observer => {
      setTimeout(() => {
        const foundUser = this.users.find((user) => 
          user.username === credentials.username && user.password === credentials.password
        );
        
        if (foundUser) {
          const roleEntry = this.roles.find((role) => role.usr === credentials.username);      
          if (roleEntry) {
            this.storeUserCredential(roleEntry, member);
            this.isLoggedInSubject.next(true);
          } 

          observer.next({ success: true});
          observer.complete();
        } else {
          observer.next({ success: false });
        }
      }, 1500);
    });
  }

}
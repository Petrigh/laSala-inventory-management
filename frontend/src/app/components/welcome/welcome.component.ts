import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit, OnDestroy{

  logged: boolean = false;
  userName: string | null | undefined;
  private loginSubscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginSubscription = this.userService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.userName = this.userService.getUsername();
        this.logged = loggedIn;
      }
    );

    this.userName = this.userService.getUsername();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  ingresar(){
    this.router.navigate(['/login']);
  }

}

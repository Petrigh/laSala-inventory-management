import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf, 
    NzButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title = "Sala Comunitaria de Elaboracion de Productos con agregado de valor de la Agricultura Familiar";
  titleShort = "Sala Comunitaria"
  userIcon = faUser;
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  ingresar(){
    this.router.navigate(['/login']);
  }

  cerrarSesion(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}

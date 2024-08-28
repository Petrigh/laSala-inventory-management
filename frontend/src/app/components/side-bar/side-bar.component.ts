import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faPlantWilt,faLayerGroup, faUsers, faBroom, faJarWheat, faAppleWhole, faTruck } from '@fortawesome/free-solid-svg-icons';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgIf, FontAwesomeModule, NzToolTipModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  recetasIcon = faBook;
  stockIcon = faLayerGroup;
    insumosIcon = faAppleWhole;
    limpiezaIcon = faBroom;
    productosIcon = faJarWheat;
  familiaIcon = faPlantWilt;
  canalIcon = faTruck;
  colaboradorxsIcon = faUsers;

  toggles: Array<boolean> = [false, false];
  showStockList: boolean = false;
  isAdmin: boolean = false;

  constructor (
    private router: Router,
    private userService: UserService
  ){}


  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(
      (admin) => {
        this.isAdmin = admin;
      }
    );
  }


  navigate(link: string){
    this.router.navigate([link]);
  }

  toggleButton(index: number){
    var val = this.toggles[index];
    this.toggles.forEach((value,index)=> this.toggles[index] = false);
    this.toggles[index] = !val;
  }
}

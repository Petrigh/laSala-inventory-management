import { Component } from '@angular/core';
import { AbmComponent } from '../abm/abm.component';
import { Actividad } from './models/actividades';
import { ActividadesService } from './services/actividades.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [
    AbmComponent
  ],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {

  listEventos: Actividad[] = [];

  constructor(
    private actividadesService: ActividadesService,
  ){}

  ngOnInit(): void {
    this.actividadesService.getActividadessMock().subscribe(
      (act)=> {
        this.listEventos = act;
      }
    );
  }

}

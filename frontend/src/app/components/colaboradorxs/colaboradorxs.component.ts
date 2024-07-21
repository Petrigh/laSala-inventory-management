import { Component } from '@angular/core';
import { Colaboradore, Historial } from './models/colaboradorxs';
import { ColaboradoresService } from './services/colaboradores.service';
import { AbmComponent } from '../abm/abm.component';

@Component({
  selector: 'app-colaboradorxs',
  standalone: true,
  imports: [
    AbmComponent
  ],
  templateUrl: './colaboradorxs.component.html',
  styleUrl: './colaboradorxs.component.css'
})
export class ColaboradorxsComponent {

  listColab: Colaboradore[] = [];
  listHistorial: Historial[] = [];

  constructor(
    private colabService: ColaboradoresService,
  ){}

  ngOnInit(): void {
    this.colabService.getColaboradoresMock().subscribe(
      (colabs)=> {
        this.listColab = colabs;
      }
    );
    this.colabService.getHistorialMock().subscribe(
      (historial)=> {
        this.listHistorial = historial;
      }
    );
  }

}

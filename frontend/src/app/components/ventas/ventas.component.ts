import { Component } from '@angular/core';
import { Venta } from './models/ventas';
import { AbmComponent } from '../abm/abm.component';
import { VentaService } from './services/ventas.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    AbmComponent
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  listVentas: Venta[] = [];

  constructor(
    private ventaService: VentaService,
  ){}

  ngOnInit(): void {
    this.ventaService.getVentasMock().subscribe(
      (venta)=> {
        this.listVentas = venta;
      }
    );
  }

}

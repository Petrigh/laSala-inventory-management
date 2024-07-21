import { Component } from '@angular/core';
import { Insumo } from '../models/stocks';
import { Stockervice } from '../services/stock.service';
import { AbmComponent } from '../../abm/abm.component';

@Component({
  selector: 'app-stock-limpieza',
  standalone: true,
  imports: [
    AbmComponent
  ],
  templateUrl: './stock-limpieza.component.html',
  styleUrl: './stock-limpieza.component.css'
})
export class StockLimpiezaComponent {

  listLimpieza: Insumo[] = [];

  constructor(
    private stockService: Stockervice,
  ){}

  ngOnInit(): void {
    this.stockService.getLimpiezaMock().subscribe(
      (limpieza)=> {
        this.listLimpieza = limpieza;
      }
    );
  }


}

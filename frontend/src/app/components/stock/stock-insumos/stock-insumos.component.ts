import { Component } from '@angular/core';
import { Insumo } from '../models/stocks';
import { Stockervice } from '../services/stock.service';
import { AbmComponent } from '../../abm/abm.component';

@Component({
  selector: 'app-stock-insumos',
  standalone: true,
  imports: [
    AbmComponent
  ],
  templateUrl: './stock-insumos.component.html',
  styleUrl: './stock-insumos.component.css'
})
export class StockInsumosComponent {

  listInsumos: Insumo[] = [];

  constructor(
    private stockService: Stockervice,
  ){}

  ngOnInit(): void {
    this.stockService.getInsumosMock().subscribe(
      (insumos)=> {
        this.listInsumos = insumos;
      }
    );
  }


}

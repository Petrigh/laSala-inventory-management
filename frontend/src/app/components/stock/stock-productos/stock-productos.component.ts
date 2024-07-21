import { Component, OnInit } from '@angular/core';
import { AbmComponent } from '../../abm/abm.component';
import { Stockervice } from '../services/stock.service';
import { Producto } from '../models/stocks';

@Component({
  selector: 'app-stock-productos',
  standalone: true,
  imports: [
    AbmComponent
  ],
  templateUrl: './stock-productos.component.html',
  styleUrl: './stock-productos.component.css'
})
export class StockProductosComponent implements OnInit{


  listProductos: Producto[] = [];

  constructor(
    private stockService: Stockervice,
  ){}

  ngOnInit(): void {
    this.stockService.getProductosMock().subscribe(
      (productos)=> {
        this.listProductos = productos;
      }
    );
  }


}

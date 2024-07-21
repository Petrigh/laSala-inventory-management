import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Venta } from '../models/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor() { }

  //Mock productos
  getVentasMock(): Observable<any[]> {
    return of(this.listOfVentas);
  }

  listOfVentas: Venta[] = [
    {
        nroVenta: 1001,
        usuario: "Maria",
        fecha: new Date("2024-07-01T09:30:00")
    },
    {
        nroVenta: 1002,
        usuario: "Juan",
        fecha: new Date("2024-07-01T11:45:00")
    },
    {
        nroVenta: 1003,
        usuario: "Profe",
        fecha: new Date("2024-07-02T14:20:00")
    },
    {
        nroVenta: 1004,
        usuario: "Lucio",
        fecha: new Date("2024-07-03T10:15:00")
    },
    {
        nroVenta: 1005,
        usuario: "Maria",
        fecha: new Date("2024-07-03T16:30:00")
    },
    {
        nroVenta: 1006,
        usuario: "Mauricio",
        fecha: new Date("2024-07-04T13:00:00")
    },
    {
        nroVenta: 1007,
        usuario: "Maria",
        fecha: new Date("2024-07-05T09:45:00")
    },
    {
        nroVenta: 1008,
        usuario: "Maria",
        fecha: new Date("2024-07-05T15:20:00")
    },
    {
        nroVenta: 1009,
        usuario: "Juan",
        fecha: new Date("2024-07-06T12:10:00")
    },
    {
        nroVenta: 1010,
        usuario: "Maria",
        fecha: new Date("2024-07-07T10:30:00")
    }
    ]

}

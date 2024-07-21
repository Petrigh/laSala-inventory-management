import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actividad } from '../models/actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor() { }

  //Mock productos
  getActividadessMock(): Observable<any[]> {
    return of(this.mockActividades);
  }

  mockActividades: Actividad[] = [
    {
      Mes: 1,
      Evento: "Producción de Mermelada de Frutilla",
      Cantidad: "100 kg",
      Horas: 8,
      Frascos: 200,
      Azucar: 50
    },
    {
      Mes: 2,
      Evento: "Elaboración de Dulce de Leche",
      Cantidad: "80 kg",
      Horas: 6,
      Frascos: 160,
      Azucar: 40
    },
    {
      Mes: 3,
      Evento: "Producción de Mermelada de Naranja",
      Cantidad: "120 kg",
      Horas: 10,
      Frascos: 240,
      Azucar: 60
    },
    {
      Mes: 4,
      Evento: "Elaboración de Dulce de Membrillo",
      Cantidad: "90 kg",
      Horas: 7,
      Frascos: 180,
      Azucar: 45
    },
    {
      Mes: 5,
      Evento: "Producción de Mermelada de Arándanos",
      Cantidad: "75 kg",
      Horas: 6,
      Frascos: 150,
      Azucar: 37
    },
    {
      Mes: 6,
      Evento: "Elaboración de Dulce de Batata",
      Cantidad: "110 kg",
      Horas: 9,
      Frascos: 220,
      Azucar: 55
    }
  ];

}

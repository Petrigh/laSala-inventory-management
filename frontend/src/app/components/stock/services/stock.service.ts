import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Insumo, Producto } from '../models/stocks';

@Injectable({
  providedIn: 'root'
})
export class Stockervice {

  constructor() { }

  

  //Mock productos
  getProductosMock(): Observable<any[]> {
    return of(this.listOfProductos);
  }

  getInsumosMock(): Observable<any[]> {
    return of(this.listOfInsumos);
  }

  getLimpiezaMock(): Observable<any[]> {
    return of(this.listOfLimpieza);
  }

  listOfLimpieza: Insumo[] = [
    {
      nombre: "DETERGENTE INDUSTRIAL",
      lote: 3001,
      stock: 100
    },
    {
      nombre: "DESINFECTANTE MULTIUSO",
      lote: 3002,
      stock: 150
    },
    {
      nombre: "LAVANDINA CONCENTRADA",
      lote: 3003,
      stock: 200
    },
    {
      nombre: "ALCOHOL EN GEL",
      lote: 3004,
      stock: 300
    },
    {
      nombre: "PAPEL HIGIÉNICO INDUSTRIAL",
      lote: 3005,
      stock: 500
    },
    {
      nombre: "JABÓN LÍQUIDO PARA MANOS",
      lote: 3006,
      stock: 250
    },
    {
      nombre: "TRAPOS DE PISO",
      lote: 3007,
      stock: 100
    },
    {
      nombre: "ESCOBAS INDUSTRIALES",
      lote: 3008,
      stock: 50
    },
    {
      nombre: "BOLSAS DE RESIDUOS GRANDES",
      lote: 3009,
      stock: 1000
    },
    {
      nombre: "DESENGRASANTE INDUSTRIAL",
      lote: 3010,
      stock: 75
    }
  ]

  listOfInsumos: Insumo[] = [
    {
      nombre: "YERBA MATE ORGÁNICA A GRANEL",
      lote: 2001,
      stock: 500
    },
    {
      nombre: "LECHE ENTERA ORGÁNICA",
      lote: 2002,
      stock: 200
    },
    {
      nombre: "AZÚCAR ORGÁNICA",
      lote: 2003,
      stock: 300
    },
    {
      nombre: "HARINA DE TRIGO INTEGRAL",
      lote: 2004,
      stock: 400
    },
    {
      nombre: "CARNE VACUNA ORGÁNICA",
      lote: 2005,
      stock: 150
    },
    {
      nombre: "ACEITE DE OLIVA EXTRA VIRGEN A GRANEL",
      lote: 2006,
      stock: 250
    },
    {
      nombre: "UVAS MALBEC ORGÁNICAS",
      lote: 2007,
      stock: 1000
    },
    {
      nombre: "ESPECIAS PARA CHIMICHURRI",
      lote: 2008,
      stock: 100
    },
    {
      nombre: "MAICENA",
      lote: 2009,
      stock: 300
    },
    {
      nombre: "LECHE DE VACA PARA QUESOS",
      lote: 2010,
      stock: 400
    }
  ]

  listOfProductos: Producto[] = [
    {
      nombre: "Yerba Mate Orgánica",
      lote: 1001,
      fechaElaboracion: new Date("2024-06-15"),
      stock: 100
    },
    {
      nombre: "Dulce de Leche Artesanal",
      lote: 1002,
      fechaElaboracion: new Date("2024-07-01"),
      stock: 50
    },
    {
      nombre: "Alfajores de Maicena Caseros",
      lote: 1003,
      fechaElaboracion: new Date("2024-05-20"),
      stock: 75
    },
    {
      nombre: "Chimichurri Orgánico",
      lote: 1004,
      fechaElaboracion: new Date("2024-07-05"),
      stock: 120
    },
    {
      nombre: "Vino Malbec Orgánico",
      lote: 1005,
      fechaElaboracion: new Date("2024-06-28"),
      stock: 80
    },
    {
      nombre: "Empanadas de Carne Congeladas",
      lote: 1006,
      fechaElaboracion: new Date("2024-04-10"),
      stock: 90
    },
    {
      nombre: "Aceite de Oliva Extra Virgen",
      lote: 1007,
      fechaElaboracion: new Date("2024-07-08"),
      stock: 60
    },
    {
      nombre: "Queso Provolone Artesanal",
      lote: 1008,
      fechaElaboracion: new Date("2024-06-20"),
      stock: 40
    }
  ];
}

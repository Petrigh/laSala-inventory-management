import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actividad, Colaboradore, Historial, Rol } from '../models/colaboradorxs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  constructor() { }

  //Mock productos
  getColaboradoresMock(): Observable<any[]> {
    return of(this.listOfColaboradorxs);
  }

  getHistorialMock(): Observable<any[]> {
    return of(this.listHistorial);
  }


  listOfColaboradorxs: Colaboradore[] = [
    {
      nombre: "JUAN PÉREZ",
      usuario: "jperez",
      email: "juan.perez@empresa.com",
      telefono: "+54 11 1234-5678",
      rol: Rol.Admin
    },
    {
      nombre: "MARÍA GONZÁLEZ",
      usuario: "mgonzalez",
      email: "maria.gonzalez@empresa.com",
      telefono: "+54 11 2345-6789",
      rol: Rol.Colaboradore
    },
    {
      nombre: "CARLOS RODRÍGUEZ",
      usuario: "crodriguez",
      email: "carlos.rodriguez@empresa.com",
      telefono: "+54 11 3456-7890",
      rol: Rol.Colaboradore
    },
    {
      nombre: "ANA MARTÍNEZ",
      usuario: "amartinez",
      email: "ana.martinez@empresa.com",
      telefono: "+54 11 4567-8901",
      rol: Rol.Admin
    },
    {
      nombre: "LUCAS FERNÁNDEZ",
      usuario: "lfernandez",
      email: "lucas.fernandez@empresa.com",
      telefono: "+54 11 5678-9012",
      rol: Rol.Colaboradore
    },
    {
      nombre: "SOFÍA LÓPEZ",
      usuario: "slopez",
      email: "sofia.lopez@empresa.com",
      telefono: "+54 11 6789-0123",
      rol: Rol.Colaboradore
    },
    {
      nombre: "MARTÍN SÁNCHEZ",
      usuario: "msanchez",
      email: "martin.sanchez@empresa.com",
      telefono: "+54 11 7890-1234",
      rol: Rol.Admin
    }
 ]

 listHistorial: Historial[] = [
  {
    usuario: "jperez",
    actividad: Actividad.Venta,
    fecha: new Date("2024-07-01T10:30:00")
  },
  {
    usuario: "mgonzalez",
    actividad: Actividad.Compra,
    fecha: new Date("2024-07-01T11:45:00")
  },
  {
    usuario: "crodriguez",
    actividad: Actividad.Modifico,
    fecha: new Date("2024-07-02T09:15:00")
  },
  {
    usuario: "amartinez",
    actividad: Actividad.Cocino,
    fecha: new Date("2024-07-02T14:30:00")
  },
  {
    usuario: "lfernandez",
    actividad: Actividad.Elimino,
    fecha: new Date("2024-07-03T16:20:00")
  },
  {
    usuario: "slopez",
    actividad: Actividad.Cargo,
    fecha: new Date("2024-07-04T08:45:00")
  },
  {
    usuario: "msanchez",
    actividad: Actividad.Venta,
    fecha: new Date("2024-07-04T13:10:00")
  },
  {
    usuario: "jperez",
    actividad: Actividad.Modifico,
    fecha: new Date("2024-07-05T11:30:00")
  },
  {
    usuario: "mgonzalez",
    actividad: Actividad.Cocino,
    fecha: new Date("2024-07-05T15:45:00")
  },
  {
    usuario: "crodriguez",
    actividad: Actividad.Compra,
    fecha: new Date("2024-07-06T10:00:00")
  }
 ]

}

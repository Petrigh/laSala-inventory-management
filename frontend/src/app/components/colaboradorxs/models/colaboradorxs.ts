import { DataItem } from "../../abm/models/dataItems";

export enum Rol {
    Admin = "Admin", 
    Colaboradore = "Colaboradore"
}

export interface Colaboradore extends DataItem{
    usuario: string;
    email: string;
    telefono: string;
    rol: Rol;
}

export enum Actividad {
    Venta = 'VENTA',
    Compra = 'COMPRA',
    Modifico = 'MODIFICO',
    Cocino = 'COCINO',
    Elimino = 'ELIMINO',
    Cargo = 'CARGO'
}

export interface Historial{
    usuario: string;
    actividad: Actividad;
    fecha: Date;
}

export enum Rol {
    Admin = "Admin", 
    Colaboradore = "Colaboradore"
}

export interface Colaboradores{
    id:number;
    usuario: string;
    nombre: string
    apellido: string;
    email: string;
    password: string;
    salt: string;
    rol: Rol;
    active: boolean;
}

export class User implements Colaboradores{
    id:number;
    nombre: string;
    usuario: string;
    apellido: string;
    email: string;
    password: string;
    salt: string;
    rol: Rol;
    active: boolean;

    constructor(obj: any){
        this.id = obj?.id ;
        this.nombre = obj?.nombre ;
        this.usuario = obj?.usuario ;
        this.apellido = obj?.apellido ;
        this.email = obj?.email ;
        this.password = obj?.password ;
        this.salt = obj?.salt ;
        this.rol = obj?.rol ;
        this.active = obj?.active ;
    }
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
    fecha: string;
}

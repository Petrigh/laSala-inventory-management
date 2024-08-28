export interface Canal{
    id: number;
    nombre: string;
    direccion: string;
    tipo: Ubicacion;
}

export class Channel implements Canal{
    id: number;
    nombre: string;
    direccion: string;
    tipo: Ubicacion;

    constructor(obj: any){
        this.id = obj?.id;
        this.nombre = obj?.nombre;
        this.direccion = obj?.direccion;
        this.tipo = obj?.tipo;
    }
    
}

export enum Ubicacion{
    WEB,
    FISICO
}
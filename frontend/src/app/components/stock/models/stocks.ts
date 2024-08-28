import { Type } from "../../recetas/models/recetas";

export interface BienStock{
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    id: number;
    tipo: Type;
}

export class Stock implements BienStock{
    id: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    tipo: Type;

    constructor(obj: any){
        this.id = obj?.id;
        this.nombre = obj?.nombre;
        this.cantidad = obj?.cantidad;
        this.tipo = obj?.tipo;
        this.precioUnitario = obj?.precioUnitario;
    }
}

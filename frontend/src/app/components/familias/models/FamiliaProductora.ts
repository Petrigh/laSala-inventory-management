export interface FamilaProductora{
    id: number;
    nombre: string;
}

export class Familia implements FamilaProductora{
    id: number;
    nombre: string;

    constructor(obj: any){
        this.id = obj?.id;
        this.nombre = obj?.nombre;
    }
    
}
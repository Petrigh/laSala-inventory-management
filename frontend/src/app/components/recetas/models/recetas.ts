export interface Receta{
    id: number | null;
    nombre: string;
    ingredientes: Array<Ingrediente>;
    producto: Ingrediente,
    descripcion: string;
}

export class Recipe implements Receta{
    id: number | null;
    nombre: string;
    ingredientes: Ingrediente[];
    producto: Ingrediente;
    descripcion: string;

    constructor(obj: any){
        this.id = obj?.id;
        this.nombre = obj?.nombre;
        this.ingredientes = obj?.ingredientes;
        this.producto = obj?.producto;
        this.descripcion = obj?.descripcion;
    }
}

export enum Type{
    INSUMO,
    PRODUCTO,
    MATERIAPRIMA
}

interface Bien{
    id: number | null,
    nombre: string,
    tipo: Type,
}

export interface Ingrediente{
    id: number | null,
    bien: Bien,
    cantidad: number,
    precioUnitario: number
}

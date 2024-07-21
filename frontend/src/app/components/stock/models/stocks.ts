import { DataItem } from "../../abm/models/dataItems";

export interface Producto extends DataItem{
    lote: number;
    fechaElaboracion: Date;
    stock: number;
}

export interface Insumo extends DataItem{
    lote: number;
    stock: number;
}
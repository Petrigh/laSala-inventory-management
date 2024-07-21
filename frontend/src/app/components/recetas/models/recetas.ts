import { DataItem } from "../../abm/models/dataItems";

export interface Receta extends DataItem{
    ingredientes: Array<string>;
    autor: string;
}
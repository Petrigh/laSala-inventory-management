import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Receta } from '../models/recetas';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  

  //Mock recetas
  getRecetasMock(): Observable<any[]> {
    return of(this.listOfData);
  }

  listOfData: Receta[] = [
    {
      nombre: "Paella Valenciana",
      ingredientes: ["arroz", "pollo", "conejo", "judías verdes", "judías blancas", "tomate", "azafrán", "romero", "aceite de oliva", "sal"],
      autor: "Juan García"
  },
  {
      nombre: "Gazpacho Andaluz",
      ingredientes: ["tomate", "pepino", "pimiento verde", "ajo", "aceite de oliva", "vinagre", "pan", "sal"],
      autor: "María López"
  },
  {
      nombre: "Tortilla Española",
      ingredientes: ["patatas", "huevos", "cebolla", "aceite de oliva", "sal"],
      autor: "Pedro Martínez"
  },
  {
      nombre: "Pulpo a la Gallega",
      ingredientes: ["pulpo", "patatas", "pimentón", "aceite de oliva", "sal gruesa"],
      autor: "Ana Fernández"
  },
  {
      nombre: "Ceviche Peruano",
      ingredientes: ["pescado blanco", "limón", "cebolla roja", "cilantro", "ají", "sal", "pimienta"],
      autor: "Carlos Morales"
  },
  {
      nombre: "Churros con Chocolate",
      ingredientes: ["harina", "agua", "sal", "azúcar", "chocolate"],
      autor: "Laura Sánchez"
  },
  {
      nombre: "Fabada Asturiana",
      ingredientes: ["fabes", "chorizo", "morcilla", "tocino", "laurel", "ajo", "cebolla", "sal"],
      autor: "Jorge González"
  },
  {
      nombre: "Empanadas Argentinas",
      ingredientes: ["harina", "manteca", "carne picada", "cebolla", "pimiento", "huevo duro", "aceitunas", "sal", "pimienta"],
      autor: "Lucía Pérez"
  },
  {
      nombre: "Tacos al Pastor",
      ingredientes: ["carne de cerdo", "piña", "cebolla", "cilantro", "limón", "tortillas de maíz", "sal"],
      autor: "Miguel Rodríguez"
  },
  {
      nombre: "Pisco Sour",
      ingredientes: ["pisco", "limón", "jarabe de goma", "huevo", "hielo", "amargo de angostura"],
      autor: "Gabriela Herrera"
  }
  ];
}

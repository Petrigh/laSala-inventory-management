import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Receta } from '../models/recetas';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    private apiUrl = environment.apiUrl+'/receta';

    constructor(private http: HttpClient) { }

  
  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }

  updateRecetas(receta: Receta, update: boolean): Observable<any> {
    if(update){
      return this.http.put(this.apiUrl+'/'+receta.id,receta);
    }
    return this.http.post(this.apiUrl,receta);
  }

  deleteReceta(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }
}

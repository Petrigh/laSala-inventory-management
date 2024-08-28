import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/recetas';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BienService {
    private apiUrl = environment.apiUrl+'/item';

    constructor(private http: HttpClient) { }

  
  getMateriasPrimas(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl+'/materiaPrima');
  }

  getProductoss(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl+'/productos');
  }
}

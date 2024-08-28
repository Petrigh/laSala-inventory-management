import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BienStock } from '../models/stocks';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class Stockervice {
  private apiUrl = environment.apiUrl+'/almacenamiento';

  constructor(private http: HttpClient) { }
  

  getInsumos(): Observable<BienStock[]> {
    return this.http.get<BienStock[]>(this.apiUrl+'/insumos');
  }

  updateBien(bien: BienStock, update: boolean): Observable<any> {
    if(update){
      return this.http.put(this.apiUrl+'/stock/',bien);
    }
    return this.http.post(this.apiUrl+'/stock',bien);
  }
 
  getProductos(): Observable<BienStock[]> {
    return this.http.get<BienStock[]>(this.apiUrl+'/productos');
  }
  getMateriaPrima(): Observable<BienStock[]> {
    return this.http.get<BienStock[]>(this.apiUrl+'/materiaPrima');
  }
}

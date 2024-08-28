import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FamilaProductora, Familia } from '../models/FamiliaProductora';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  private apiUrl = environment.apiUrl+'/familiaProductora';

  constructor(private http: HttpClient) { }

  getFamilias(): Observable<FamilaProductora[]> {
    return this.http.get<Familia[]>(this.apiUrl);
  }

  getFamiliaById(id: number): Observable<FamilaProductora[]> {
    return this.http.get<Familia[]>(this.apiUrl+'/'+id);
  }

  updateFamilias(flia: Familia, update: boolean): Observable<any> {
    if(update){
      return this.http.put(this.apiUrl+'/'+flia.id,flia);
    }
    return this.http.post(this.apiUrl,flia);
  }

  deleteFamilia(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }
}

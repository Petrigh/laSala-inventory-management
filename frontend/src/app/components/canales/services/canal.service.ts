import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Canal, Channel } from '../models/Canal';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CanalService {
  private apiUrl = environment.apiUrl+'/canal';

  constructor(private http: HttpClient) { }

  getCanales(): Observable<Canal[]> {
    return this.http.get<Channel[]>(this.apiUrl);
  }

  getCanalById(id: number): Observable<Canal[]> {
    return this.http.get<Channel[]>(this.apiUrl+'/'+id);
  }

  updateCanals(canal: Channel, update: boolean): Observable<any> {
    if(update){
      return this.http.put(this.apiUrl+'/'+canal.id,canal);
    }
    return this.http.post(this.apiUrl,canal);
  }

  deleteCanal(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  getTipoCanales(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl+'/tipos');
  }
}

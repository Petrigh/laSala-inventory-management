import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Colaboradores, User } from '../models/colaboradorxs';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
  private apiUrl = environment.apiUrl+'/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Colaboradores[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUsers(user: User, update: boolean): Observable<any> {
    if(update){
      return this.http.put(this.apiUrl,user);
    }
    return this.http.post(this.apiUrl,user);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  activateUsuario(id: number): Observable<any> {
    return this.http.put(this.apiUrl+'/activate/'+id,null);
  }

  getRolesColabs(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl+'/roles');
  }
}

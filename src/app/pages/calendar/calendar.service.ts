import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }
  GetChambreByCode = (codSoc:any,matPers:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListConje/"+codSoc+"/"+matPers);
  };
}

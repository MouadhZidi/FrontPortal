import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminInterfaceService {


  constructor(private http: HttpClient) { }

  GetUser = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "api/auth/getUser");
  };
  UpdateRole(data:any):Observable<any>{
    return this.http.put<any>("http://localhost:8080/api/auth/setRole",data);
  }
  UpdatePss(data:any):Observable<any>{
    return this.http.put<any>("http://localhost:8080/api/auth/updatePass",data);
  }
}

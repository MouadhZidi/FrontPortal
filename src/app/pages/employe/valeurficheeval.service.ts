import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValeurficheevalService {
  constructor(private http:HttpClient) { }
  getficheeval=(x:any): Observable<any[]> =>{
    return this.http.post<any[]> (environment.urlServerhichem+"/valeurficheeval/getvaleurficheeval",x)
  
  }
  gettac=(x:any): Observable<any[]> =>{
    return this.http.post<any[]> (environment.urlServerhichem+"/valeurficheeval/cal",x)
  
  }
  evaldef=(x:any): Observable<any[]> =>{
    return this.http.post<any[]> (environment.urlServerhichem+"/FicheEvalDef/FicheEvalDef",x)}


}

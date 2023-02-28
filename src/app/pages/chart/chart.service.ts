import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private header: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders();
  }

  GetAbsantiesme = (): Observable<any[]> => {
    return this.httpClient.get<any[]>("http://localhost:8080/Absanteisme/Absanteisme");
  };

  GetAbsantiesmeBySexe = (annee:any): Observable<any[]> => {
    return this.httpClient.get<any[]>("http://localhost:8080/Absanteisme/AbsanteismeBySexe/"+annee);
  };
  GetAbsantiesmeByLibelle = (annee:any): Observable<any[]> => {
    return this.httpClient.get<any[]>("http://localhost:8080/Absanteisme/AbsanteismeByLibelle/"+annee);
  };
  GetDepartDefinitive = (annee:any): Observable<any[]> => {
    return this.httpClient.get<any[]>("http://localhost:8080/DepartDefinitve/DepartDefinitve/"+annee);
  };
  GetDepartEntreSortie = (): Observable<any[]> => {
    return this.httpClient.get<any[]>("http://localhost:8080/EntreeSortie/EntreeSortie");
  };
  getConge = (codSoc:any,matPers:any): Observable<any[]> => {
    return this.httpClient.get<any[]>("http://127.0.0.1:8080/statsoldcng/stat/"+codSoc+"/"+matPers);
  };
  GetAbsantiesmeByLibellebycodandmat = (cod:any,mat:any): Observable<any[]> => {
    return this.httpClient.get<any[]>("http://localhost:8080/Absanteisme/AbsanteismeByLibellebycodandmat/"+cod+"/"+mat);
  };
}

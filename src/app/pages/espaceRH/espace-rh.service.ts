import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/';
const AUTH_APII = 'http://localhost:8080/demande/downloadFile/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
@Injectable({
  providedIn: 'root'
})
export class EspaceRhService {

  constructor(private http: HttpClient) { }
  download(file: number | undefined): Observable<Blob> {
    return this.http.get(AUTH_APII+file, {
      responseType: 'blob'
    });
  }

  GetListDemande = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getDemandes");
  };

  GetListDemandeByrepRh = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getDemandesRepRh");
  };
  UpdateDemande(data:any):Observable<any>{
    return this.http.put<any>("http://localhost:8080/demande/updateRh",data);
  }
  GetListDemandeAutorisation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/getdemauto");
  };
  GetListDemandePret = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/getdempret");
  };
  GetListDemandeAttestation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/getdemattestation");
  };
  GetListDemandeFormation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/getdemformation");
  };
 
  GetListDemandecongee= (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/getdemcongee");
  };
  GetListDemandeSituation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/getDemSituation");
  };
  GethistListDemandeAutorisation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/gethistdemauto");
  };
  GethistListDemandePret = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/gethistdempret");
  };
  GethistListDemandeAttestation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/gethistdemattestation");
  };
  GethistListDemandeFormation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/gethistdemformation");
  };
 
  GethistListDemandecongee= (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/gethistdemcongee");
  };
  GethistListDemandeSituation = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/demande/gethistDemSituation");
  };
  
}

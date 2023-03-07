import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/';
const AUTH_APII = 'http://localhost:8080/demande/downloadFile/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EspaceChefService {
  constructor(private http: HttpClient,) { }
  
  GetListDemande = (codSoc:any,matPers:any,codServ:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListDemandeChef/"+codSoc+"/"+matPers+"/"+codServ);
  };

  UpdateDemande(data:any):Observable<any>{
    return this.http.put<any>("http://localhost:8080/demande/updateag",data);
  }
  
  GetListDemandeRepChefNull = (codSoc:any,matPers:any,codServ:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListDemandeByChef/"+codSoc+"/"+matPers+"/"+codServ);
  };
  GetListDemandeRepChefNotNull = (codSoc:any,matPers:any,codServ:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListDemandeByChefNotNull/"+codSoc+"/"+matPers+"/"+codServ);
  };
  download(file: number | undefined): Observable<Blob> {
    return this.http.get(AUTH_APII+file, {
      responseType: 'blob'
    });
  }

 
}


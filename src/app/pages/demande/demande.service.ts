import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/';
const AUTH_APII = 'http://localhost:8080/demande/downloadFile/';
const AUTH_API_MAIL = 'http://localhost:8181/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }
  upload(user:FormData){
    return this.http.post(AUTH_API + 'demande/createDemande',user)

  }
  CreateDemWithoutFile(user:any){
    return this.http.post(AUTH_API + 'demande/addDemandeWithoutFile',user)

  }
  GetDecision = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getDec");
  };
  GetChambreByCode = (codSoc:any,matPers:any,typeD:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListDemande/"+codSoc+"/"+matPers+"/"+typeD);
  };
  GetTitreFormation = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getTitreFormation");
  };
  GetTypeFormation = (codTit:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getTypeFormation/"+codTit);
  };

  GetThemeFormation = (codTit:any,codeTyp:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getThemeFormation/"+codTit+"/"+codeTyp);
  };
  GetTitreGroupePret = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getGroupePret");
  };
  GetTypePret = (codTyp:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getTypePret/"+codTyp);
  };
  GetTypeAutorisation = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getTypeAut");
  };
  GetMotifCng = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getMotifCng");
  };
  GetMatchef = (mat:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "api/auth/"+mat);
  };
  download(file: number | undefined): Observable<Blob> {
    return this.http.get(AUTH_APII+file, {
      responseType: 'blob'
    });
  }
  sendMail(user:any){
    return this.http.post(AUTH_API_MAIL + 'mailing/sendemailcombined',user)

  }
  GetAdrChef = (mat:any): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/api/auth/"+mat);
  };
  getMaskMontant= (): Observable<any[]> => {
    return this.http.get<any[]>( "http://localhost:8080/mask/getFormatMontant");
  };

  GetMatRH = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "api/auth/matRh");
  };
}

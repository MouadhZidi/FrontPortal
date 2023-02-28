import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";


const API_URL = environment.urlServerMouadh;
const api = "http://localhost:8080/consPaie/getPaie";
const apiRh = "http://localhost:8080/consPaie/getPaieRh";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class PaieService {

  host = API_URL;

  private header: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders();
  }

  GetChambre = (): Observable<any[]> => {
    return this.httpClient.get<any[]>(API_URL + "/facture/get");
  };

  GetChambreByCode = (): Observable<any[]> => {
    return this.httpClient.get<any[]>(API_URL + "/demande/getListDemandee/02");
  };
  GetConge = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      API_URL + "/conge/getbycodesocandmatpers/" + codSoc + "/" + matPers
    );
  };

  GetTypeBull = (): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      API_URL + "/conge/gettypebul" 
    );
  };

  getNom = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      API_URL + "/conge/getnom/" + codSoc + "/" + matPers
    );
  };

  getPrenom = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      API_URL + "/conge/getprenom/" + codSoc + "/" + matPers
    );
  };

  GetCongeById = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      API_URL + "/conge/getcongebyeid/" + codSoc + "/" + matPers
    );
  };
  getReportFacture(numFactInd: any) {
    const httpOptions = {
      //'responseType'  : 'arraybuffer' as 'json'
      responseType: "blob" as "json",
    };
    return this.httpClient.get<any>(
      API_URL + "/conge/report/" + numFactInd,
      httpOptions
    );
  }

  public GetBull(bulletin: any) {
    return this.httpClient.post<any>("http://localhost:8080/consPaie/getPaie", bulletin);
  }
  public GetBullRh(bulletin: any) {
    return this.httpClient.post<any>(apiRh, bulletin);
  }
}

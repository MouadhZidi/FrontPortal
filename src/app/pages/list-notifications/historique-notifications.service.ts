import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class HistoriqueNotificationService {


  private header: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders();
  }


  GetHistorique = (matPers: any,codSoc: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      "http://localhost:8082/notification/gethistoriquenotification/" + matPers + "/" + codSoc
    );
  };

  getNotificationEvent = (): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      "http://localhost:8082/notification/getNotificationEvent/"
    );
  };



}

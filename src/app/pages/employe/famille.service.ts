import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
const api = environment.urlServerhichem;
const AUTH_API = "http://127.0.0.1:8080/";

@Injectable({
  providedIn: "root",
})
export class FamilleService {
  constructor(private http: HttpClient) {}
  getconjoint = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/famille/getconjoint/" + x + "/" + y);
  };
  getEnfant = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/famille/getenfant/" + x + "/" + y);
  };
  AjoutConjoint(conjoint: any) {
    return this.http.post(AUTH_API + "famille/famille", conjoint);
  }
  SupprimerFamille(mat:any,numFam:any){
    return this.http.delete(AUTH_API + 'famille/'+mat+"/"+numFam)
  }
}

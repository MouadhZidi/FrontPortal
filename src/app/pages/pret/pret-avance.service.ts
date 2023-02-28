import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { TokenStorage } from 'src/app/core/services/token-storage.service';


const API_URL = environment.urlServerMouadh;
const AUTH_API = 'http://127.0.0.1:8080';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class PretAvanceService {

  constructor(private http: HttpClient,public token:TokenStorage) { }



  fetchPretAvance(params :any){

    return this.http.post<any[]>(AUTH_API + '/pretAvance/getpretlig',params)
  
    
   }
   
   getListPret23(){

    return this.http.get<any[]>(AUTH_API + '/pretAvance/typepret')
  
    
   }
  
   getListPretCode(codSoc,matPers){

    return this.http.get<any[]>(AUTH_API + '/pretAvance/getpretperscode/'+codSoc+'/'+matPers)
  
    
   }
   
}

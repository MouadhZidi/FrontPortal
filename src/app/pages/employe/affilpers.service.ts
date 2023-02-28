import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const api=environment.urlServerhichem
@Injectable({
  providedIn: 'root'
})
export class AffilpersService {
  constructor(private http:HttpClient) { }


  getaffilpers= (a:any,b:any): Observable<any[]> =>{

    return this.http.get<any[]>(api+"/affilprs/get/"+a+"/"+b);}}
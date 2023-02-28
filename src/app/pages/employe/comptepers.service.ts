import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const api=environment.urlServerhichem
const apimm=environment.urlServerMouadh
@Injectable({
  providedIn: 'root'
})
export class ComptepersService {

  constructor(private http:HttpClient) { }


  getEnfant= (a:any,b:any,x:any): Observable<any[]> =>{

    return this.http.get<any[]>(api+"/comptepers/getall/"+a+"/"+b+"/"+x);}
  
  
  getall(){
    return this.http.get<any[]>(apimm+"/conge/gettypebul");}





  }
  
  
  
  


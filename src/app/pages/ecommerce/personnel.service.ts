import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  constructor(private http: HttpClient) { }
  getbycodesocandmatpers(x:any,y:any){
    return this.http.get("http://127.0.0.1:8080/pers/getbycodesocandmatpers/"+x+"/"+y)
  }
  getetatpaie(x:any,y:any){
    return this.http.get("http://127.0.0.1:8080/pers/get1/"+x+"/"+y)


  }
  getnat(x:any,y:any){
    return this.http.get("http://127.0.0.1:8080/pers/get2/"+x+"/"+y)
  }
  getaffect(x:any,y:any){
    return this.http.get("http://127.0.0.1:8080/pers/get3/"+x+"/"+y)
  }
  getpersonnel=(x:any): Observable<any[]> =>{
  return this.http.post<any[]> ("http://127.0.0.1:8080/infoPers/getPers",x)

}
getfamsoc=(x:any,y:any): Observable<any[]> =>{
  return this.http.get<any[]> ("http://127.0.0.1:8080/scofam/getscol/"+x+"/"+y)

}}

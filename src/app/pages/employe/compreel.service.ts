import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompreelService {

  constructor(private http:HttpClient) { }
  getcompreel= (a:any): Observable<any[]> =>{

    return this.http.get<any[]>(environment.urlServerhichem+"/Competance_reel/get/"+a);}



    getcomprequise= (a:any): Observable<any[]> =>{

      return this.http.get<any[]>(environment.urlServerhichem+"/COMPETENCE_POSTE/get/"+a);}

}

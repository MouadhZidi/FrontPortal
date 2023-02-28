import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ObjempService {

  constructor(private http:HttpClient) { }
  getobj= (x:any,y:any): Observable<any[]> =>{

    return this.http.get<any[]>(environment.urlServerhichem+"/OBJECTIF/getobj/"+x+"/"+y);
    
    
      }
}

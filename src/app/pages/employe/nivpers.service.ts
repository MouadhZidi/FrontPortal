import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NivpersService {

  constructor(private http: HttpClient) { }
  getnivpers(x:any,y:any){
    return this.http.get(environment.urlServerhichem+"/NIVEAU_PERS/getniv/"+x+"/"+y)
  }
}

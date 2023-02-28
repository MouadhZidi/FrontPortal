import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  constructor(private http:HttpClient) { }
  getall(){

return this.http.get(environment.urlServerhichem+"/Mod/getall")


  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FicheevalcompService {

  constructor(private http:HttpClient) { }
  getFicheEval(mat:any){
return this.http.get(environment.urlServerhichem+"/FICHEEVALCOMP/getfiche/"+mat)



  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';
const AUTH_API = 'http://localhost/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })

export class AuthenticationService {


  constructor(private http: HttpClient) { }

  login(matpers: string, usepswd: string): Observable<any> {
    return this.http.post("http://localhost:8080/api/auth/signin", {
      matpers,
      usepswd
    }, httpOptions);
  }
  //'api/auth/signupt'

  register(username: string, email: string, password: string,matricule:string,nom:string,prenom:string): Observable<any> {
    return this.http.post(AUTH_API + 'signuptt33', {
      username,
      email,
      password,
      matricule,
      nom,
      prenom

    }, httpOptions);
  }
  register2(user:any){
    return this.http.post("http://localhost:8080/api/auth/signupt",user)

  }


  tokenExp(){
    return this.http.get("http://localhost:8080/param/getTokenExp")

  }
  findbymatpers(mat:any){
    return this.http.get("http://localhost:8080/api/auth/findbymatpers/"+mat)

  }


  logout() {
    localStorage.clear();
  }





}


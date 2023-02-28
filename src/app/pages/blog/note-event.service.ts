import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class NoteEventService {

  constructor(  private http:HttpClient) { }
  getall(){


    return this.http.get('http://localhost:8080/noteevent/getall')
  }
  getbyid(id:number){
    return this.http.get('http://localhost:8080/noteevent/getbyid/'+id)
  }

  getImageById(id:number){
    return this.http.get('http://localhost:8080/noteevent/image/'+id
    , {
      responseType: "blob",
    });
  }

  download(file: number | undefined): Observable<Blob> {
    return this.http.get('http://localhost:8080/noteevent/files/'+file, {
      responseType: 'blob'
    });
  }
  upload(event:FormData){
    return this.http.post(AUTH_API + 'noteevent/createevent',event)

  }

  getbyD(){
    return this.http.get('http://localhost:8080/noteevent/getbyD')
  }

  getbyDd(){
    return this.http.get('http://localhost:8080/noteevent/get')
  }

}

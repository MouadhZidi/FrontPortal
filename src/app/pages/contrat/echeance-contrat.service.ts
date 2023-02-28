import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcheanceContratService {

 
  constructor(private http: HttpClient,  private translate:TranslateService 
    ) { }

  getContrat (){

    return this.http.get<any[]>('http://localhost:8080/contrat/getcontrat')
  
    
   }
   getListContrat (date1:any,date2:any){

    return this.http.get<any[]>('http://localhost:8080/contrat/getlistcontrat/'+date1+'/'+date2)
  
    
   }

   
  public languageSubject = new BehaviorSubject<string>(this.translate.currentLang);
  language$: Observable<string> = this.languageSubject.asObservable();

  setLanguage(language: string) {
    this.languageSubject.next(language);
  }
}

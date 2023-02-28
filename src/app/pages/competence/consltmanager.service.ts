import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsltmanagerService {

  constructor(private http: HttpClient) { }

  getListCompetence(matPers:any){

    return this.http.get<any[]>('http://localhost:8080/Competence' + '/getcomptence/'+matPers)
  
    
   }
   
  getListCompetenceReq(matPers:any){

    return this.http.get<any[]>('http://localhost:8080/Competence' + '/getcomptencereq/'+matPers)
  
    
   }

   getListCompetenceReqPers  = (matPers:any,matPersAgent :any): Observable<any[]> => {

    return this.http.get<any[]>('http://localhost:8080/Competence' + '/getcomptencereq/'+matPers+'/'+matPersAgent)
  
    
   }
   getListNatCompetence(){

    return this.http.get<any[]>('http://localhost:8080/Competence/getallcompetence/')
  
    
   }
   getListPers(codSoc :any,matPers:any){

    return this.http.get<any[]>('http://localhost:8080/Competence' + '/getlispesonel/'+codSoc+'/'+matPers)
  
    
   }

   addCompetence(compt : any){

    return   this.http.post<any[]>('http://localhost:8080/Competence/addcompetence',compt)
    
      
     }
     addCompetencePers(comptPers : any){

      return   this.http.post<any[]>('http://localhost:8080/Competence/addcompetencepers',comptPers)
      
        
       }

  


       deleteCompetencePers(codSoc: string, codCandidat: string, codNatComp: string, codComp: string) {
        return this.http.delete('http://localhost:8080/Competence/delet/'+ codSoc + '/' + codCandidat + '/' + codNatComp + '/' + codComp);
      }


      saveCompetencePers(competenceAndPersObject : any){

        return   this.http.post<any[]>('http://localhost:8080/Competence/savecompetencepers',competenceAndPersObject)
        
          
         }

         getCompReq(matPers:any){

          return this.http.get<any[]>('http://localhost:8080/Competence' + '/getcomptencereqise/'+matPers)
        
          
         }
}

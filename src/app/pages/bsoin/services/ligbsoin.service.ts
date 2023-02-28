import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
const AUTH_API = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class LigbsoinService {
  id!: any;

  constructor(private http: HttpClient) {

  
   }


 
   bultSoinDet(codSoc : any ,matPers:any,numSoins:any){

    return this.http.get<any[]>(AUTH_API + '/bultSoin/bsoindet/'+codSoc+"/"+matPers+'/'+numSoins)
  
   }
   
   fetchListCodPret(codSoc : any ,matPers:any){

    return this.http.get<any[]>(AUTH_API + '/bultSoin/getbultsoinscode/'+codSoc+"/"+matPers)
  
    
   }
   fetchListBulletSoin(codSoc : any ,matPers:any){

    return this.http.get<any[]>(AUTH_API + '/bultSoin/getbultlist/'+codSoc+'/'+matPers)
  
    
   }

   fetchListBulletSoinStar(codSoc : any ,matPers:any){

    return this.http.get<any[]>(AUTH_API + '/bultSoin/getbultsoinstar/'+matPers+"/"+codSoc)
  
    
   }

   fetchLigBulletSoinStar(codSoc : any ,matPers:any){

    return this.http.get<any[]>(AUTH_API + '/bultSoin/getligbultstarlist/'+codSoc+"/"+matPers)
  
    
   }
   fetchLigbultStarDetList(codSoc : any ,matPers:any,numSoin:any){

    return this.http.get<any[]>(AUTH_API + '/bultSoin/getligbultstardetlist/'+codSoc+"/"+matPers+'/'+numSoin)
  
    
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/';
const AUTH_APIi = 'http://192.168.2.232:8080/';
const api = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})

export class AjoutPersService {

  constructor(private http: HttpClient) { }

  GetListCategorie = (codCategorie:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "cat/getall/"+codCategorie);
  };
  GetListCateg = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Categ/getcateg");
  };
  GetListMotif = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Motif/getall");
  };
  GetListServiceMilitaire = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "PRM_MILITAIRE/getall");
  };
  GetListServices = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "serv/getall");
  };
  GetListGrad = (codcateg:any,codCategorie:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Grade/getallgrade/"+codcateg+"/"+codCategorie);
  };
  GetListAffectation = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getaffectation");
  };
  GetListNiveau = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getniv");
  };
  GetListPostTrav = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getpost_trav");
  };
  GetListAdmTech = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/gettypeadmtech");
  };
  GetListLieuGeo = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getPRM_LIEU_GEOGRAPHIQUE");
  };
  GetListFiliere = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getFiliere");
  };
  GetListGouvernorat = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getgouv");
  };
  GetListClassAdm = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getclass_adm");
  };
  GetListFonction = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getfct");
  };
  GetListNationalité = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Pays/getall");
  };
  GetListMetier = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Pays/getalllibactfam");
  };
  GetListActiviteEnfant = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Pays/getalllibactfamenfant");
  };
  GetEchlon = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "Lib/getallech");
  };
  getgetAllServiceByServ = (serv:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "serv/getAllServiceByServ/"+serv);
  };
  getAllDiplome = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "PRM_MILITAIRE/getallniv");
  };  
  getAllnivv = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "PRM_MILITAIRE/getallniv");
  };
  getAllNiveau= (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "PRM_MILITAIRE/getallNiveau");
  };
  getAllSpecialite= (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "PRM_MILITAIRE/getallSpecialite");
  };
  getAllOrganisme= (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "PRM_MILITAIRE/getallOrganisme");
  };

  existByMatPers= (matPers:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "infoPers/exist/"+matPers);
  };
  getMaskDate= (): Observable<any[]> => {
    return this.http.get<any[]>(api + "mask/getFormatDate");
  };


  AjoutCV(cv:any){
    return this.http.post(AUTH_API + 'NIVEAU_PERS/saveNIVEAU_PERS',cv)

  }

  AjoutPersonnel(user:any){
    return this.http.post(AUTH_API + 'infoPers/savepers',user)

  }
  AjoutConjoint(user:any[] ){
    return this.http.post(AUTH_API + 'famille/saveFam',user)

  }
  AjoutEnfant(user:any[]){
    return this.http.post(AUTH_API + 'famille/saveenf',user)
  }

  DeleteFamille(num:any,mat:any){
    return this.http.delete(AUTH_API + 'famille/'+num+"/"+mat)
  }
  DeleteCv(cod:any,mat:any,num_niv:any){
    return this.http.delete(AUTH_API+'NIVEAU_PERS/'+cod+"/"+mat+"/"+num_niv)
  }
  GetMaxConjoint = (codsoc:any,matpers:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "famille/getMaxConjoint/"+codsoc+"/"+matpers);
  };

  GetListEnfant = (codsoc:any,matpers:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "famille/getMaxConjoint/"+codsoc+"/"+matpers);
  };
  GetPersonnel = (pers:any): Observable<any[]> => {
    return this.http.post<any[]>(AUTH_API + "infoPers/getPersonnel",pers);
  };
  GetConjoint = (conj:any): Observable<any[]> => {
    return this.http.post<any[]>(AUTH_API + "famille/findconjoints",conj);
  };
  GetEnfant = (enf:any): Observable<any[]> => {
    return this.http.post<any[]>(AUTH_API + "famille/getenfants",enf);
  };

  GetCv = (cv:any): Observable<any[]> => {
    return this.http.post<any[]>(AUTH_API + "NIVEAU_PERS/nivpers",cv);
  };

  UpdateEnfant(user:any[]){
    return this.http.post(AUTH_API+ 'famille/update',user)
  }
  UpdateCv(user:any[]){
    return this.http.post(AUTH_API+ 'NIVEAU_PERS/updateNiv',user)
  }

  AddNewLineConjoint(user:any[] ){
    return this.http.post(AUTH_API + 'famille/AddNewLineConjoint',user)

  }
  AddNewLineEnfant(user:any ){
    return this.http.post(AUTH_API + 'famille/AddNewLineEnfant',user)

  }

  AddNewLineCV(cv:any){
    return this.http.post(AUTH_API + 'NIVEAU_PERS/AddNewLineCV',cv)

  }

  
}
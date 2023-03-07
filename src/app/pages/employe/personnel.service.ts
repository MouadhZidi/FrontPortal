import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
const api = environment.urlServerhichem;
import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';
import { TranslateService } from "@ngx-translate/core";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: "root",
})
export class PersonnelService {
  constructor(private http: HttpClient,private translate:TranslateService) {}
  getbycodesocandmatpers(x: any, y: any) {
    return this.http.get(api + "/pers/getbycodesocandmatpers/" + x + "/" + y);
  }
  getetatpaie(x: any, y: any) {
    return this.http.get(api + "/pers/get1/" + x + "/" + y);
  }
  getnat(x: any, y: any) {
    return this.http.get(api + "/pers/get2/" + x + "/" + y);
  }
  getaffect(x: any, y: any) {
    return this.http.get(api + "/pers/get3/" + x + "/" + y);
  }
  getpersonnel = (x: any): Observable<any[]> => {
    return this.http.post<any[]>(api + "/infoPers/getPers", x);
  };
  getfamsoc = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/scofam/getscol/" + x + "/" + y);
  };
  getcollab = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/infoPers/getPers22/" + x + "/" + y);
  };
  getadr = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/Adrpers/getAdrpers/" + x + "/" + y);
  };

  getpersonnelcol = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/infoPers/getPers/" + x + "/" + y);
  };
  getImage = (x: any): Observable<Blob> => {
    return this.http.get(api + "/infoPers/files/" + x, {
      responseType: "blob",
    });
  };

  getSanction = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/sanction/getSanc/" + x + "/" + y);
  };

  getSoldeConge = (x: any, y: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/conge/getSoldeConge/" + y + "/" + x);
  };



  getDashboardInformation = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.http.get<any[]>(api + "/DashboardInformation/Informations/" + codSoc + "/" + matPers);
  };


  exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
   
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  getlassolde(x:any,y:any){
    return this.http.get(api + "/conge/derniersolde/" + x + "/" + y); 
  }

  // getlassolde(x:any,y:any){
  //   return this.http.get(api + "/conge/derniersolde/" + x + "/" + y); 
  // }

  public languageSubject = new BehaviorSubject<string>(this.translate.currentLang);
  language$: Observable<string> = this.languageSubject.asObservable();

  setLanguage(language: string) {
    this.languageSubject.next(language);
  }

 
  GetMatriculeRH = (): Observable<any[]> => {
    return this.http.get<any[]>("http://localhost:8080/api/auth/matRh");
  };

}

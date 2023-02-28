import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PersonnelService } from '../personnel.service';
import { FamilleService } from '../famille.service';
import { RenseignementpersService } from '../renseignementpers.service';

@Component({
  selector: 'app-infoprof',
  templateUrl: './infoprof.component.html',
  styleUrls: ['./infoprof.component.scss']
})
export class InfoprofComponent implements OnInit {

  cod_soc:any
  mat_pers:any
conjoint:any=[]
  perso:any
  get44:any
  ad:any
  affect:any
  deb:any
  fin:any
  nat:any
  etat:any
  sexe:any
  tab: any;
   gouv: any ;
  tab2: any;
  getbymatcod:any
  rens:any=[]
  adrpersbycodeandmat:any=[]
  rensper:any
  g:any;
  mat:any
h:string="10908"
  x:string="01"
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers}

  // bread crumb items
  breadCrumbItems: Array<{}>;
  selectValue = [];
  stateValue = [];

  constructor(private token:TokenStorage,private serv:PersonnelService,private serv2:FamilleService,private serv3:RenseignementpersService) { }

  ngOnInit() {
    this.getpers()
    this.getadrpers()
    this.getrenspers()
    this.getconjoint()
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Checkout', active: true }];

    this.selectValue = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola',
      'Anguilla', 'Antarctica', 'Argentina', 'Hawaii', 'California', 'Colombia', 'Congo', 'Dominica', 'Denmark', 'Nevada', 'Oregon',
      'Washington', 'Ecuador', 'Idaho', 'Montana', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Nicaragua', 'New Caledonia', 'North Dakota',
      'Tonga', 'Tunisia', 'Thailand', 'Turkey', 'Illinois', 'Tuvalu', 'Uganda', 'Uruguay', 'United Arab Emirates', 'United Kingdom', 'Venezuela', 'Zimbabwe',
      'Uruguay'];

    this.stateValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Montana', 'Nevada', 'New Mexico', 'New York', 'North Dakota', 'Texas', 'Virginia', 'Wisconsin', 'Wyoming']

  }
  getpers(){

    this.serv.getpersonnel(this.perso11).subscribe(
      data => {
        this.perso11 = data; console.log('exected' + data);
       this.adrpersbycodeandmat=this.perso11.adresses_personnel
       this.rens=this.perso11.rens_pers
        console.log("dddddddd"+this.perso.nom_pers)
      },
      err => {
        console.log(err);
      }
      );}
      getadrpers(){

        this.serv.getpersonnel(this.perso11).subscribe(
          data => {

           this.adrpersbycodeandmat=this.perso11.adresses_personnel
          },
          err => {
            console.log(err);
          }
          );






  }
  getrenspers(){

    this.serv.getpersonnel(this.perso11).subscribe(
      data => {

       this.rens=this.perso11.rens_pers
      },
      err => {
        console.log(err);
      }
      );






}
getconjoint(){
  this.serv2.getconjoint(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
    data => {

     this.conjoint=this.perso11.rens_pers
    },
    err => {
      console.log(err);
    }
    );





}


}

import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { FamilleService } from '../famille.service';
import { PersonnelService } from '../personnel.service';
import { RenseignementpersService } from '../renseignementpers.service';

@Component({
  selector: 'app-infopers',
  templateUrl: './infopers.component.html',
  styleUrls: ['./infopers.component.scss']
})
export class InfopersComponent implements OnInit {
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
  n:any
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers}

  // bread crumb items


  constructor(private token:TokenStorage,private serv:PersonnelService,private serv2:FamilleService,private serv3:RenseignementpersService) { }

  ngOnInit() {
    this.getpers()
    this.getadrpers()
    this.getrenspers()
    this.getconjoint()


    
  }
  getpers(){

    this.serv.getpersonnel(this.perso11).subscribe(
      data => {
        this.perso11 = data; console.log('exected' + data);
       this.adrpersbycodeandmat=this.perso11.adresses_personnel
       this.rens=this.perso11.rens_pers
        this.n=this.perso11.cod_serv
        console.log(this.n)
        console.log(this.n)
        console.log(this.n)
        console.log(this.n)

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

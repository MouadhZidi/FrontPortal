import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { Usergrid } from '../../contacts/usergrid/usergrid.model';
import { PersonnelService } from '../../Employe/personnel.service';
import { EspaceChefService } from '../espace-chef.service';
@Component({
  selector: 'app-historique-chef',
  templateUrl: './historique-chef.component.html',
  styleUrls: ['./historique-chef.component.scss']
})
export class HistoriqueChefComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;
 listDemande:any[]
 userGridData: Usergrid[];
 selected;
 lib:any;
 libelle="Formation"
 userForm: FormGroup;
 submitted = false;
 items: FormArray;
 p:any
 term:string
 n:any
 perso11 :any = {
   cod_soc:this.tokenService.getUser().cod_soc,
   mat_pers:this.tokenService.getUser().matpers}
 // Select2 Dropdown
 selectValue: string[];
 constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
   private serv:EspaceChefService,private tokenService:TokenStorage,private service:PersonnelService) { }
 displayData = [1,2,3]; 
 ngOnInit() {

   this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users Grid', active: true }];
   this.userForm = this.formBuilder.group({
     id_libre_demande:[''],
     dateDemande: [''],
     heurS: ['', [Validators.required]],
     mntDem:['',Validators.required],

     heurR: ['', [Validators.required]],
     minS: ['', [Validators.required]],
     minR: ['', [Validators.required]],
     codAut:['',Validators.required],
     cngTemps:['',Validators.required],
     cngTempsDebut:['',Validators.required],
     cngTempsFin:['',Validators.required],
     codM:['',Validators.required],
     codTit:['',Validators.required],
     codGrpPret : ['',Validators.required],
     typPret: ['',Validators.required],
     codTyp:['',Validators.required],
     txtDem: ['', [Validators.required]],
     lib_autorisation: ['', [Validators.required]],
     lib_demande: ['', [Validators.required]],
     datDebut:[''],
     datFin:[''],
     numAttest: [''],
     annee:[''],
     titre:[''],
     type_formation:[''],
     theme:[''],
     group_pret: [''],
     lib_pret:[''],
     motif:[''],
     reponseChef:['', [Validators.required]],
     txtChef:['', [Validators.required]],
   });
   /**
    * fetches data
    */
   this.getListDemandeChef()
   this.getpers()
 }

 get form() {
   return this.userForm.controls;
 }

 /**
  * Open modal
  * @param content modal content
  */
 /**
  * Open modal
  * @param lib modal content
  */
 /**
  * User grid data fetches
  */


openModal(targetModal, user) {
 this.modalService.open(targetModal, {
  centered: true,
  backdrop: 'static'
 });

 this.userForm.patchValue({
   id_libre_demande: user.id_libre_demande,

  dateDemande: user.dateDemande,
  heurS: user.heurS,
  heurR: user.heurR,
  txtDem: user.txtDem,
  lib_autorisation: user.lib_autorisation,
  lib_demande: user.lib_demande,

  datDebut: user.datDebut,
  datFin: user.datFin,
  numAttest: user.numAttest,
  annee: user.annee,
  titre: user.titre,
  type_formation: user.type_formation,
  theme: user.theme,
  group_pret: user.group_pret,
  lib_pret: user.lib_pret,
  motif: user.motif,

  mntDem: user.mntDem,

  minS:  user.minS,
  minR:  user.minR,
  codAut: user.codAut,
  cngTemps: user.cngTemps,
  cngTempsDebut: user.cngTempsDebut,
  cngTempsFin: user.cngTempsFin,
  codM: user.codM,
  codTit: user.codTit,
  codGrpPret : user.codGrpPret,
  typPret: user.typPret,
  codTyp: user.codTyp,
  reponseChef:user.reponseChef,
  txtChef:user.txtChef,

 });
 this.lib=this.userForm.get('lib_demande').value
 console.log(this.lib)



}

getpers(){

 this.service.getpersonnel(this.perso11).subscribe(
   data => {
     this.perso11 = data; console.log('exected' + data);

     this.n=this.perso11.cod_serv


   },
   err => {
     console.log(err);
   }
   );}

 getListDemandeChef() {
   this.serv.GetListDemandeRepChefNotNull(this.tokenService.getUser().cod_soc,"10326" /* this.tokenService.getUser().matpers */,/* this.n */"1F0").subscribe(
     (data: any[]) => {
       this.listDemande = data;
 
       console.log(data);
     },
     (error) => {
       console.log(error);
     }
   );
 }
 updateDemande(){
  
   this.serv.UpdateDemande(this.userForm.value)

    .subscribe({
      next:(res)=>{
        if (res) {
          if (res) {
           Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: 'Votre demande à été bien enregistrer !',
             showConfirmButton: false,
             timer: 2000
           });
           // this.toastr.success(' agence updated!', 'update effectuée avec succés.');
        //  this.userForm.reset();
          this.modalService.dismissAll();
          } else {
           // this.toastr.error('Echec update', 'Problème de suppression.');
          }      

                } 

      },

     

    })

}
showMore() {
 let newLength = this.displayData.length + 3;
 if (newLength > this.listDemande.length) {
     newLength = this.listDemande.length
 }
  this.displayData = this.listDemande.slice(0, newLength);
}
 /**
  * Save user
  */

}

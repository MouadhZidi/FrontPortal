import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { Usergrid } from '../../contacts/usergrid/usergrid.model';
import { PersonnelService } from '../../Employe/personnel.service';
import { EspaceChefService } from '../espace-chef.service';
import { saveAs } from "file-saver";
import { WebsocketService } from 'src/app/layouts/topbar/shared/services/websocket.service';

@Component({
  selector: 'app-espace-chef',
  templateUrl: './espace-chef.component.html',
  styleUrls: ['./espace-chef.component.scss']
})
export class EspaceChefComponent implements OnInit {
 // bread crumb items
 mat_pers:any
 id:any
 dataRH:any
 libelleDoc:any
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
   isCollapsed: boolean;
   Notification: any = {
    date_notif: "",
    libelle_notif: "",
    nom: "",
    type_notif: "",
    cod_soc:"",
	 mat_pers:"",
id_sender:"",
id_reciver:"",
etat_notif:"",
rep_chef:""
  };
   perso11 :any = {
     cod_soc:this.tokenService.getUser().cod_soc,
     mat_pers:this.tokenService.getUser().matpers}
   // Select2 Dropdown
   selectValue: string[];
   constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
     private serv:EspaceChefService,private tokenService:TokenStorage,private service:PersonnelService
     ,private websocketService: WebsocketService) { }
   displayData = [1,2,3]; 
   ngOnInit() {
    this.isCollapsed = false;

     this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users Grid', active: true }];
     this.userForm = this.formBuilder.group({
       id_libre_demande:[''],
       dateDemande: [''],
       heurS: ['', [Validators.required]],
       mntDem:['',Validators.required],
 matPers:[''],
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
       fileName:['']
     });
     /**
      * fetches data
      */
     this.getpers()
     this.GetMatriculeRH()
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
    matPers:user.matPers,
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
    fileName:user.fileName
 
 
   });
   this.lib=this.userForm.get('lib_demande').value
   this.id=this.userForm.get('id_libre_demande').value
   this.libelleDoc=this.userForm.get('fileName').value
   this.mat_pers=this.userForm.get('matPers').value
   console.log(this.lib)
 
 
 
  }
 
  getpers(){
 
   this.service.getpersonnel(this.perso11).subscribe(
     data => {
       this.perso11 = data; console.log('exected' + data);
 
       this.n=this.perso11.cod_serv
       

       this.serv.GetListDemandeRepChefNull(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers, this.n).subscribe(
         (data: any[]) => {
           this.listDemande = data;
     
           console.log(this.listDemande);
           console.log(this.listDemande);
           console.log(this.listDemande);

         },
         (error) => {
           console.log(error);
         }
       );
 
     },
     err => {
       console.log(err);
     }
     
     );}
 
 
   printerReportt(){
     try {
         
         this.serv.download(this.id)
         .subscribe((blob) => saveAs(blob,this.libelleDoc));
       
 
     } catch (error) {
       console.log(error)
     }
   }


   GetMatriculeRH(){
 
    this.service.GetMatriculeRH().subscribe(
      data => {
        this.dataRH = data;
        console.log("data rh ",this.dataRH)
      },
      err => {
        console.log(err);
      }
      
      );}




   updateDemande(){
    this.Notification.date_notif=new Date().toLocaleDateString().substring(0,10)
    this.Notification.libelle_notif="Demande"
    this.Notification.nom=this.userForm.get('txtDem').value 
    this.Notification.type_notif=this.lib
    this.Notification.mat_pers=this.tokenService.getUser().matpers
    this.Notification.id_sender=this.tokenService.getUser().matpers
    this.Notification.etat_notif="N"
    this.Notification.id_reciver=this.dataRH.mat_pers
    this.Notification.rep_chef="O"

    this.Notification.cod_soc=this.tokenService.getUser().cod_soc

    console.log(this.Notification)
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
 
 this.websocketService.AjouNotif(this.Notification).subscribe(
  (event: any) => {
    console.log(this.Notification)
   this.getpers()
  }
);
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
 
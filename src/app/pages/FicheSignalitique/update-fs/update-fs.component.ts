import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,

} from "@angular/forms";
import { GridApi } from "ag-grid-community";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import Swal from "sweetalert2";
import { FamilleService } from "../../Employe/famille.service";
import { AjoutPersService } from "../ajout-pers.service";
import Inputmask from "inputmask";
import { Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
  selector: 'app-update-fs',
  templateUrl: './update-fs.component.html',
  styleUrls: ['./update-fs.component.scss']
})
export class UpdateFSComponent implements OnInit {
  @ViewChild("myInputDateNaissance") myInputElementRefNaissance: ElementRef;
  @ViewChild("myInputDateEmbauche") myInputElementRefEmbauche: ElementRef;
  @ViewChild("myInputDateNaissanceEnfant") myInputElementRefNaissanceEnfant: ElementRef;


  tableData: any[];
  listActiviteEnfant: any = [];
  tableDataConj: any[];
  tableDataCV:any[]
  selectedRows: any[] = [];
enfs:any

  cv:any[]
userForm: FormGroup;
conj:any[]
enf:any=[]
maskdate: any;
isCollapsed: boolean;
personnel:any
show: boolean = false;
title = "grid";
api!: GridApi;
rowData: any[] = [];
// bread crum data
phoneData: FormGroup;
etatmat: boolean;

breadCrumbItems: Array<{}>;
// Table data
public selected: any;
hideme: boolean[] = [];
formCv: FormGroup;
editableTable: any;
formPersonnel: FormGroup;
formAffectation: FormGroup;
formconjoint: FormGroup;
formCV: FormGroup;
listCateg: any;
listMotif: any;
listMilitaire: any;
listService: any;
listGrad: any;
listAffect: any;
listNiveau: any=[];
listPostTrav: any;
listAdmTech: any = [];
listLieuGeo: any;
listFiliere: any;
listGouv: any = [];
listClassAdm: any;
listPays: any = [];
listMetier: any = [];
listCategg: any = [];
listDiplome: any = [];
listOrganisme: any = [];
listSpecialite: any = [];

listFonction: any = [];

listEchlonh: any[];
listServ: any;
value: any;
matricule: any=0;
cod_soc:any=0;
payss: any = [];
formEnfant: FormGroup;
form: FormGroup;
formE: FormGroup;
FormCVV: FormGroup;
formlistE: FormArray;
mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
maxCon: any;
formPers:FormGroup
empForm: FormGroup;

formTest: FormGroup;
settings = {
  add:{
    confirmCreate:true,
    addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
    createButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
},
  edit: {
    confirmSave: true,
    editButtonContent: '<i class="mdi mdi-update"></i> ',
    saveButtonContent: '<a (click)="UpdateEnfant(event)"> <i class="mdi mdi-content-save"></i></a>',
    cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
  },
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="mdi mdi-delete"></i>',
    saveButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
  },
//     edit:{
//       confirmEdit:true
//  },
  columns: {

    prenom: {
      title: 'Nom et prénom',
filter:false
    },
    sexe: {
      title: 'Genre',
      filter:false,

      editor: {
        type: 'list',
        config: {
          
          list: [
            { value: 'F', title: 'Femme' },
            { value: 'H', title: 'Homme' },
          ],
          },
      },

    },

    mat_pers: {
      title: 'Matricule',
      filter:false,
defaultValue:this.matricule,
hide:true
 
    },
    cod_soc: {
      title: 'code socité',
      filter:false,
      defaultValue:this.cod_soc,
      hide:true
 
    },

    dat_naiss: {
      title: 'Date naissance',
      filter:false,


    },
    
    cod_activite: {
      title: 'Activité',
      filter:false,

      editor: {
        type: 'list',
        config: {
          list:this.listActiviteEnfant &&this.listActiviteEnfant.map((grp)=>{
          return {'value':grp.cod_activite,'title':grp.lib_activite}
          })
          },
      },

    },
  },
};
Conj = {
  add:{
    confirmCreate:true,
    addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
    createButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
},
  edit: {
    confirmSave: true,
    editButtonContent: '<i class="mdi mdi-update"></i> ',
    saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
    cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
  },
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="mdi mdi-delete"></i>',
    saveButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
  },
  columns: {

    prenom: {
      title: 'Nom et prénom',
      filter:false
 
    },
    mat_pers: {
      title: 'Matricule',
      filter:false,
defaultValue:this.matricule,
hide:true
 
    },
    cod_soc: {
      title: 'code socité',
      filter:false,
      defaultValue:this.cod_soc,
      hide:true
 
    },
    cod_pays: {
      filter:false,

      title: 'Nationalité',
      type:'list',
      editor: {
        type: 'list',
        config: {
          list:this.payss &&this.payss.map((grp)=>{
          return {'value':grp.cod_pays,'title':grp.lib_pays}
          })
          },
      },

    },
    cod_activite: {
      title: 'Metier',
      filter:false,

      type:'list',
      editor: {
        type: 'list',
        config: {
          list:this.listMetier &&this.listMetier.map((grp)=>{
          return {'value':grp.cod_activite,'title':grp.lib_activite}
          })
          },
      },

    },

    profession: {
      filter:false,

      title: 'Emploi',

    },

  },
};
CV = {
  add:{
    confirmCreate:true,
    addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
    createButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
},
  edit: {
    confirmSave: true,
    editButtonContent: '<i class="mdi mdi-update"></i> ',
    saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
    cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
  },
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="mdi mdi-delete"></i>',
    saveButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
  },
  columns: {


    cod_niveau: {
      title: 'Dîplome',        
      filter:false,

      type:'list',
      editor: {
        type: 'list',
        config: {
          list:this.listDiplome &&this.listDiplome.map((grp)=>{
          return {'value':grp.cod_niveau,'title':grp.lib_niveau}
          })
          },
      },
    },
    code_domaine: {
      title: 'Spécialité',
      filter:false,

      type:'list',
      editor: {
        type: 'list',
        config: {
          list:this.listSpecialite &&this.listSpecialite.map((grp)=>{
          return {'value':grp.code_domaine,'title':grp.lib_domaine}
          })
          },
      },
    },
      cod_etab: {
        title: 'Ecole',
        filter:false,

        editor: {
          type: 'list',
          config: {
            list:this.listOrganisme &&this.listOrganisme.map((grp)=>{
            return {'value':grp.cod_org,'title':grp.lib_org}
            })
            },
        },
      },

      date_niveau: {
        title: 'Date dîplome',
        filter:false
        

   
      },

      mat_pers: {
        title: 'Matricule',
        filter:false,
  defaultValue:this.matricule,
  hide:true
   
      },
      cod_soc: {
        title: 'code socité',
        filter:false,
        defaultValue:this.cod_soc,
        hide:true
   
      },
    },


  
};
  @ViewChild('smartTable') smartTable: Ng2SmartTableComponent;

constructor(
  private fb: FormBuilder,
  private persServ: AjoutPersService,
  private serv: FamilleService,
  private tokenService: TokenStorage
) {
  (this.form = this.fb.group({
    formlist: this.fb.array([]),
  })),
    (this.formE = this.fb.group({
      formlistE: this.fb.array([]),
    })),
    (this.phoneData = this.fb.group({
      phoneValue: this.fb.array([]),
    })),
    (this.FormCVV = this.fb.group({
      formlistCV: this.fb.array([]),
    })),
    (this.empForm = this.fb.group({
      employees: this.fb.array([]),
    }));


}

ngOnInit() {

  this.isCollapsed = false;

  this.addField();
  this.addFieldE();
  this.addFieldCV();


  /**
   * fetch data
   */

this.formPers = this.fb.group({
  mat_pers:[""],
  cod_soc:[""]
})
this.formEnfant = this.fb.group({
  prenom: ["", Validators.required],
  cod_activite: ["", Validators.required],
  dat_naiss: ["", Validators.required],
  sexe: ["", Validators.required],
  profession: ["", Validators.required],
  num_fam:["2"],
  mat_pers: [""],
  cod_soc: ["01"],
})
  this.formCV = this.fb.group({
    cod_soc: ["01"],
    mat_pers: [""],
    num_niveau: [""],
    cod_niveau: [""],
    code_domaine: [""],
    code_option: [""],
    observation: [""],
    cod_etab: [""],
    niveau_ent: [""],
    date_niveau: [""],
    date_fin: [""],
    date_deb: [""],
    id_niveau_pers: [""],
    cod_user: [""],
  });
  this.formPersonnel = this.fb.group({
    cod_soc: ["01"],
    mat_pers: ["", Validators.required],
    nom_pers: ["", Validators.required],
    pren_pers: ["", Validators.required],
    nom_pers_a: [""],
    pren_pers_a: [""],
    nom_jf: [""],
    nom_jf_a: [""],
    cin: [""],
    sexe: ["", Validators.required],
    cod_sit: [""],
    dat_sit: [""],
    chef_fam: [""],
    nbre_enf: [""],
    charg_enf: [""],
    charg_all: [""],
    fct_fam: [""],
    dat_ent: [""],
    dat_tit: [""],
    cod_serv: [""],
    cod_fonct: [""],
    cod_categ: [""],
    cod_cat: [""],
    cod_grad: [""],
    cod_motif: [""],
    cod_natp: [""],
    cod_stat: [""],
    dat_serv: [""],
    dat_fonct: [""],
    dat_qualf: [""],
    dat_categ: [""],
    dat_cat: [""],
    dat_grad: [""],
    dat_ech: [""],
    dat_emb: [""],
    dat_motif: [""],
    dat_nais: ["", Validators.required],
    etat_act: [""],
    per_mat_pers: [""],
    qualf: [""],
    cod_ech: [""],
    cod_affect: [""],
    cod_niveau: [""],
    poste_trav: [""],
    cod_metier: [""],
    cod_user: [""],
    dat_maj: [""],
    adm_tech: [""],
    dat_stat: [""],
    dat_cin: [""],
    lie_emi_cin: [""],
    dat_affect: [""],
    lieu_nais: [""],
    cod_lieu_geog: [""],
    dat_lieu_geog: [""],
    grp_sang: [""],
    num_retr: [""],
    cod_fil: [""],
    dat_fil: [""],
    code_domaine: [""],
    cod_ur: [""],
    cod_class: [""],
    dat_class: [""],
    cod_typ_depart: [""],
    dat_depart: [""],
    dat_ur: [""],
    org_serv: [""],
    dat_poste_trav: [""],
    cod_nat_recr: [""],
    dat_adm_tech: [""],
    dat_org_serv: [""],
    maintien_pers: [""],
    maintien_date: [""],
    typ_rang: [""],
    handicap: [""],
    pourcent_hand: [""],
    typ_handicap: [""],
    num_fich_hand: [""],
    niv_sal: [""],
    cod_assur: [""],
    num_assur: [""],
    cod_retr: [""],
    typ_id: [""],
    etat_sante: [""],
    dat_eff_fich_hand: [""],
    dat_fin_fich_hand: [""],
    ref_fonct: [""],
    nat_texte_fonct: [""],
    nouv_dat_ech: [""],
    dat_niv_sal: [""],
    dat_ass: [""],
    dat_aff_cnam: [""],
    etat_poste_trav: [""],
    dat_fin_cont: [""],
    presum_nais: [""],
    cod_fill: [""],
    suspens_ass: [""],
    cod_motif_susp: [""],
    dat_fin_suspens: [""],
    dat_deb_suspens: [""],
    chronique: [""],
    cod_cat_class: [""],
    cod_gouv: [""],
    cod_loc: [""],
    serv_mil: [""],
    num_ass_gat: [""],
    num_acc: [""],
    categ_emb: [""],
    cat_emb: [""],
    grad_emb: [""],
    ech_emb: [""],
    id_personnel: [""],
    lieu_nais_a: [""],
    benef_allf: [""],
    cod_dir: [""],
    cod_uf: [""],
    lib_adm_tech: [""],
    lib_affect: [""],
    lib_cat: [""],
    lib_categ: [""],
    lib_class: [""],
    lib_cod_metier: [""],
    lib_domaine: [""],
    lib_etat_act: [""],
    lib_fil: [""],
    lib_fonct: [""],
    lib_gouv: [""],
    lib_grad: [""],
    lib_motif: [""],
    lib_niveau: [""],
    lib_poste_trav: [""],
    lib_serv: [""],
  });
  //this.getCategorie()
  this.getMotif();
  this.getServiceMilitaire();
  this.getServices();
  // this.getGrad()
  this.getAffectation();
  this.getNiveau();
  this.getPostrav();
  this.getAdmTech();
  this.getLieuGeo();
  this.getFiliere();
  this.getGouv();
  this.getClassAdm();
  this.getPays();
  this.getFonction();
  this.getAdmTech();
  this.getActiviteEnfant();
  this.getEchlon();
  this.getLibCateg();
  this.GetConge();
  this.getLibActFam();
  this.getDiplome();
  this.getSpecialite();
  this.getOrganisme();

}

changeValue(i) {
  this.hideme[i] = !this.hideme[i];
}
// _fetchData() {
//   this.tableData = tableData;
//   this.editableTable = editableTable;
//   for (let i = 0; i <= this.tableData.length; i++) {
//     this.hideme.push(true);
//   }
// }
onSelect(event: any) {
  this.persServ.getgetAllServiceByServ(event.target.value).subscribe(
    (data: any[]) => {
      this.listServ = data;

    },
    (error) => {
    }
  );
}


isClicked: boolean = false;
enterHit: boolean = false;
//When clicked will change the isClicked property to opposite of its current value
changeTitle() {
  this.isClicked = !this.isClicked;
}

//FUnction to run when hit enter
onEnter() {
  this.enterHit = !this.enterHit;
}

onSelectCategorie(event: any) {
  this.value = event.target.value;
  this.persServ.GetListCategorie(event.target.value).subscribe(
    (data: any[]) => {
      this.listCateg = data;

    },
    (error) => {
    }
  );
}
onSelect2(event: any) {


  this.persServ.GetListGrad(this.value, event.target.value).subscribe(
    (data: any[]) => {
      this.listGrad = data;

    },
    (error) => {
    }
  );
}

// getCategorie(){

//   this.persServ.GetListCategorie().subscribe(
//     data => {
//       this.listCateg = data;
//     },

//     );}

getFonction() {
  this.persServ.GetListFonction().subscribe((data) => {
    this.listFonction = data;
  });
}
getDiplome() {
  this.persServ.getAllnivv().subscribe((data) => {
    this.listDiplome = data;
    this.CV = {
      add:{
        confirmCreate:true,
        addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
        createButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
    },
      edit: {
        confirmSave: true,
        editButtonContent: '<i class="mdi mdi-update"></i>',
        saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
      delete: {
        confirmDelete: true,
    deleteButtonContent: '<i class="mdi mdi-delete"></i>',
    saveButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
      },

      columns: {
  
  
        cod_niveau: {
          title: 'Dîplome',       
           filter:false,
  
          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listDiplome &&this.listDiplome.map((grp)=>{
              return {'value':grp.cod_niveau,'title':grp.lib_niveau}
              })
              },
          },
        },
        code_domaine: {
          title: 'Spécialité',
          filter:false,
  
          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listSpecialite &&this.listSpecialite.map((grp)=>{
              return {'value':grp.code_domaine,'title':grp.lib_domaine}
              })
              },
          },
        },
          cod_etab: {
            title: 'Ecole',
            filter:false,
  
            editor: {
              type: 'list',
              config: {
                list:this.listOrganisme &&this.listOrganisme.map((grp)=>{
                return {'value':grp.cod_org,'title':grp.lib_org}
                })
                },
            },
          },
  
          date_niveau: {
            title: 'Date dîplome',
            filter:false
            
  
       
          },
          
      mat_pers: {
        title: 'Matricule',
        filter:false,
  defaultValue:this.matricule,
  hide:true
   
      },
      cod_soc: {
        title: 'code socité',
        filter:false,
        defaultValue:this.cod_soc,
        hide:true
   
      },
        },
  
  
      
    };
  
  });
}

getSpecialite() {
  this.persServ.getAllSpecialite().subscribe((data) => {
    this.listSpecialite = data;
    this.CV = {
      add:{
        confirmCreate:true,
          addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
          createButtonContent: '<i class="mdi mdi-content-save"></i>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
    },
      edit: {
        confirmSave: true,
        editButtonContent: '<i class="mdi mdi-update"></i> ',
        saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
      delete: {
        confirmDelete: true,
    deleteButtonContent: '<i class="mdi mdi-delete"></i>',
    saveButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi-book-remove-outline"></i>'
      },
      columns: {
  
  
        cod_niveau: {
          title: 'Dîplome',        filter:false,
  
          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listDiplome &&this.listDiplome.map((grp)=>{
              return {'value':grp.cod_niveau,'title':grp.lib_niveau}
              })
              },
          },
        },
        code_domaine: {
          title: 'Spécialité',
          filter:false,
  
          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listSpecialite &&this.listSpecialite.map((grp)=>{
              return {'value':grp.code_domaine,'title':grp.lib_domaine}
              })
              },
          },
        },
          cod_etab: {
            title: 'Ecole',
            filter:false,
  
            editor: {
              type: 'list',
              config: {
                list:this.listOrganisme &&this.listOrganisme.map((grp)=>{
                return {'value':grp.cod_org,'title':grp.lib_org}
                })
                },
            },
          },
  
          date_niveau: {
            title: 'Date dîplome',
            filter:false
            
  
       
          },

          mat_pers: {
            title: 'Matricule',
            filter:false,
      defaultValue:this.matricule,
      hide:true
       
          },
          cod_soc: {
            title: 'code socité',
            filter:false,
            defaultValue:this.cod_soc,
            hide:true
       
          },
        },
  
  
      
    };
  });
}

getOrganisme() {
  this.persServ.getAllOrganisme().subscribe((data) => {
    this.listOrganisme = data;
    this.CV = {
      add:{
        confirmCreate:true,
          addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
          createButtonContent: '<i class="mdi mdi-content-save"></i>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
    },
      edit: {
        confirmSave: true,
        editButtonContent: '<i class="mdi mdi-update"></i> ',
        saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
      delete: {
        confirmDelete: true,
        deleteButtonContent: '<i class="mdi mdi-delete"></i>',
        saveButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
      },
      columns: {
  
  
        cod_niveau: {
          title: 'Dîplome',        filter:false,
  
          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listDiplome &&this.listDiplome.map((grp)=>{
              return {'value':grp.cod_niveau,'title':grp.lib_niveau}
              })
              },
          },
        },
        code_domaine: {
          title: 'Spécialité',
          filter:false,
  
          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listSpecialite &&this.listSpecialite.map((grp)=>{
              return {'value':grp.code_domaine,'title':grp.lib_domaine}
              })
              },
          },
        },
          cod_etab: {
            title: 'Ecole',
            filter:false,
  
            editor: {
              type: 'list',
              config: {
                list:this.listOrganisme &&this.listOrganisme.map((grp)=>{
                return {'value':grp.cod_org,'title':grp.lib_org}
                })
                },
            },
          },
  
          date_niveau: {
            title: 'Date dîplome',
            filter:false
            
  
       
          },

          mat_pers: {
            title: 'Matricule',
            filter:false,
      defaultValue:this.matricule,
      hide:true
       
          },
          cod_soc: {
            title: 'code socité',
            filter:false,
            defaultValue:this.cod_soc,
            hide:true
       
          },
        },
  
  
      
    };
  });
}
getNiveau() {
  this.persServ.getAllNiveau().subscribe((data) => {
    this.listNiveau = data;

  });
}
getLibActFam() {
  this.persServ.GetListMetier().subscribe((data) => {
    this.listMetier = data;
    this.Conj = {
      add:{
        confirmCreate:true,
        addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
        createButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
   },
      edit: {
        confirmSave: true,
        editButtonContent: '<i class="mdi mdi-update"></i> ',
        saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
      delete: {
        confirmDelete: true,
        deleteButtonContent: '<i class="mdi mdi-delete"></i>',
        saveButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
      },
      columns: {
  
        prenom: {
          title: 'Nom et prénom',
          filter:false,

     
        },
        mat_pers: {
          title: 'Matricule',
          filter:false,
          defaultValue:this.matricule,
          hide:true
    

          
        },
        cod_soc: {
          title: 'code socité',
          filter:false,
          defaultValue:this.cod_soc,
          hide:true
     
        },
        cod_pays: {
          title: 'Nationalité',
          filter:false,

          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.payss &&this.payss.map((grp)=>{
              return {'value':grp.cod_pays,'title':grp.lib_pays}
              })
              },
          },

        },
        cod_activite: {
          title: 'Metier',
          filter:false,

          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listMetier &&this.listMetier.map((grp)=>{
              return {'value':grp.cod_activite,'title':grp.lib_activite}
              })
              },
          },
  
        },
        profession: {
          title: 'Emploi',
          filter:false,


        },
  
      },
    };
  });
}
getLibCateg() {
  this.persServ.GetListCateg().subscribe((data) => {
    this.listCategg = data;
  });
}
getActiviteEnfant() {
  this.persServ.GetListActiviteEnfant().subscribe((data) => {
    this.listActiviteEnfant = data;
    this.settings = {
      add:{
        confirmCreate:true,
        addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
        createButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
    },
      edit: {
        confirmSave: true,
        editButtonContent: '<a (click)="getformatDateNaissanceEnfant()"><i class="mdi mdi-update"></i></a> ',
        saveButtonContent: '<a (click)="UpdateEnfant(event)"> <i class="mdi mdi-content-save"></i></a>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
      delete: {
        confirmDelete: true,
        deleteButtonContent: '<i class="mdi mdi-delete"></i>',
        saveButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
  //     edit:{
  //       confirmEdit:true
  //  },
      columns: {
  
        prenom: {
          title: 'Nom et prénom',
          filter:false

        },
        sexe: {
          title: 'Genre',
          filter:false,

          editor: {
            type: 'list',
            
            config: {
              list: [
                { value: 'F', title: 'Femme' },
                { value: 'H', title: 'Homme' },
              ],
              },
          },
  
        },
        dat_naiss: {
          filter:false,

          title: 'Date naissance',

        },
        mat_pers: {
          title: 'Matricule',
          filter:false,
    defaultValue:this.matricule,
    hide:true
     
        },
        cod_soc: {
          title: 'code socité',
          filter:false,
          defaultValue:this.cod_soc,
          hide:true
     
        },
        cod_activite: {
          title: 'Activité',
          filter:false,

          editor: {
            type: 'list',
            config: {
              list:this.listActiviteEnfant &&this.listActiviteEnfant.map((grp)=>{
              return {'value':grp.cod_activite,'title':grp.lib_activite}
              })
              },
          },

        },
      },
    };
  });
}
getMotif() {
  this.persServ.GetListMotif().subscribe((data) => {
    this.listMotif = data;
  });
}
getServiceMilitaire() {
  this.persServ.GetListServiceMilitaire().subscribe((data) => {
    this.listMilitaire = data;
  });
}
getServices() {
  this.persServ.GetListServices().subscribe((data) => {
    this.listService = data;
  });
}
// getGrad(){

//   this.persServ.GetListGrad().subscribe(
//      data => {
//      this.listGrad = data;
//         },
//        );}
getAffectation() {
  this.persServ.GetListAffectation().subscribe((data) => {
    this.listAffect = data;
  });
}

getPostrav() {
  this.persServ.GetListPostTrav().subscribe((data) => {
    this.listPostTrav = data;
  });
}
getAdmTech() {
  this.persServ.GetListAdmTech().subscribe((data) => {
    this.listAdmTech = data;
  });
}
getEchlon() {
  this.persServ.GetEchlon().subscribe((data) => {
    this.listEchlonh = data;
  });
}
getLieuGeo() {
  this.persServ.GetListLieuGeo().subscribe((data) => {
    this.listLieuGeo = data;
  });
}
getFiliere() {
  this.persServ.GetListFiliere().subscribe((data) => {
    this.listFiliere = data;
  });
}
getGouv() {
  this.persServ.GetListGouvernorat().subscribe((data) => {
    this.listGouv = data;
  });
}
getClassAdm() {
  this.persServ.GetListClassAdm().subscribe((data) => {
    this.listClassAdm = data;
  });
}
getPays() {
  this.persServ.GetListNationalité().subscribe((data) => {
    this.payss = data;
    this.Conj = {
      add:{
        confirmCreate:true,
        addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
        createButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
   },
      edit: {
        confirmSave: true,
        editButtonContent: '<i class="mdi mdi-update"></i> ',
        saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
        cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
      delete: {
        confirmDelete: true,
        deleteButtonContent: '<i class="mdi mdi-delete"></i>',
        saveButtonContent: '<i class="mdi mdi-content-save"></i>',
        cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
      },
      columns: {
  
        prenom: {
          title: 'Nom et prénom',
          filter:false,

     
        },
        mat_pers: {
          title: 'Matricule',
          filter: false,
          defaultValue:this.matricule,
          hide:true

        },
        cod_soc: {
          title: 'code socité',
          filter:false,
          defaultValue:this.cod_soc,
          hide:true
     
        },
        cod_pays: {
          title: 'Nationalité',
          filter:false,

          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.payss &&this.payss.map((grp)=>{
              return {'value':grp.cod_pays,'title':grp.lib_pays}
              })
              },
          },

        },
        cod_activite: {
          title: 'Metier',
          filter:false,

          type:'list',
          editor: {
            type: 'list',
            config: {
              list:this.listMetier &&this.listMetier.map((grp)=>{
              return {'value':grp.cod_activite,'title':grp.lib_activite}
              })
              },
          },
  
        },
        profession: {
          title: 'Emploi',
          filter:false,


        },
  
      },
    };
  });
}
formData(): FormArray {
  return this.form.get("formlist") as FormArray;
}

formDataEnfant(): FormArray {
  return this.formE.get("formlistE") as FormArray;
}

formDataCV(): FormArray {
  return this.FormCVV.get("formlistCV") as FormArray;
}

phonedata(): FormArray {
  return this.phoneData.get("phoneValue") as FormArray;
}

phone(): FormGroup {
  return this.fb.group({
    phonenumber: "",
  });
}

 field(): FormGroup {
  return this.fb.group({
    prenom: ["", Validators.required],
    cod_activite: ["", Validators.required],
    dat_naiss: ["", Validators.required],
    sexe: ["", Validators.required],
    profession: ["", Validators.required],
    num_fam:[""],
    mat_pers: [""],
    cod_soc: ["01"],
  });
}

fieldC(): FormGroup {
  return this.fb.group({
    prenom: [""],
    cod_pays: [""],
    cod_activite: [""],

    profession: [""],

    mat_pers: [""],
    cod_soc: ["01"],
  });
}

fieldCV(): FormGroup {
  return this.fb.group({
    cod_soc: ["01"],
    mat_pers: [""],
    num_niveau: [""],
    cod_niveau: [""],
    code_domaine: [""],
    code_option: [""],
    observation: [""],
    cod_etab: [""],
    niveau_ent: [""],
    date_niveau: [""],
    date_fin: [""],
    date_deb: [""],
    id_niveau_pers: [""],
    cod_user: [""],

  });
}

/**
 * Add phone field in list
 */
addPhone() {
  this.phonedata().push(this.phone());
}

/**
 * Remove field from form
 * @param i specified index to remove
 */
removeField(i: number) {
  if (confirm("Vous êtes sûre de supprimer le conjoint?")) {
    this.formData().removeAt(i);
  }
}

removeFieldE(i: number) {
  if (confirm("Vous êtes sûre de supprimer l`enfant?")) {
    this.formDataEnfant().removeAt(i);
  }
}

removeFieldCV(i: number) {
  if (confirm("Vous êtes sûre de supprimer le CV")) {
    this.formDataCV().removeAt(i);
  }
}

/**
 * Delete phone field from list
 * @param i specified index
 */
deletePhone(i: number) {
  this.phonedata().removeAt(i);
}

/**
 * Add field in form
 */


addField() {
  this.formData().push(this.fieldC());
}

addFieldE() {
  this.formDataEnfant().push(this.field());
}

addFieldCV() {
  this.formDataCV().push(this.fieldCV());
}

GetConge() {
  this.serv
    .getconjoint(
      this.tokenService.getUser().cod_soc,
      this.tokenService.getUser().matpers
    )
    .subscribe(
      (data: any[]) => {
        this.rowData = data;

      },
      (error) => {
      }
    );
}

onSelectMat(event: any) {
  this.value = event.target.value;

  this.persServ.existByMatPers(event.target.value).subscribe(
    (data: any) => {
      this.etatmat = data;

    },
    (error) => {
    }
  );
}
UpdatePersonnel() {
  if (this.formPersonnel.valid) {
    this.persServ
      .AjoutPersonnel(this.formPersonnel.value)
      .subscribe((event: any) => {
        if (event) {
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "L`ajout à été bien enregistrer",
            showConfirmButton: false,
            timer: 2000,
          });

        }
      });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Des cases sont manquantes !",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

UpdateConjoint(event:any) {

  this.persServ
    .UpdateEnfant(event.newData)
    .subscribe((event: any) => {
      if (event) {

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Veuiller vérifier vos données",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "L`ajout à été bien enregistrer",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
}

updateEnfant(event:any) {

  this.persServ
    .UpdateEnfant(event.newData)
    .subscribe((event: any) => {
      if (event) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Veuiller vérifier vos données",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "L`ajout à été bien enregistrer",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
}
UpdateCv(event:any) {

  this.persServ.UpdateCv(event.newData).subscribe((data: any) => {
    if (!data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Votre ajout à été bien enregistrer",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Echec",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
}
GetPers() {


  this.persServ
    .GetPersonnel(this.formPers.value)
    .subscribe((data: any) => {
      this.personnel=data
      this.matricule=this.personnel.mat_pers
      this.cod_soc=this.personnel.cod_soc
      console.log("rrrrrr"+this.personnel.mat_pers)
      this.Conj = {
        add:{
          confirmCreate:true,
          addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
          createButtonContent: '<i class="mdi mdi-content-save"></i>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
     },
        edit: {
          confirmSave: true,
          editButtonContent: '<i class="mdi mdi-update"></i> ',
          saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
        },
        delete: {
          confirmDelete: true,
    deleteButtonContent: '<i class="mdi mdi-delete"></i>',
    saveButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
        },
        columns: {
    
          prenom: {
            title: 'Nom et prénom',
            filter:false,
  
       
          },
          mat_pers: {
            title: 'Matricule',
            filter:false,
            defaultValue:this.matricule,
            hide:true
      
  
            
          },
          cod_soc: {
            title: 'code socité',
            filter:false,
            defaultValue:this.cod_soc,
            hide:true
            
       
          },
          cod_pays: {
            title: 'Nationalité',
            filter:false,
  
            type:'list',
            editor: {
              type: 'list',
              config: {
                list:this.payss &&this.payss.map((grp)=>{
                return {'value':grp.cod_pays,'title':grp.lib_pays}
                })
                },
            },
  
          },
          cod_activite: {
            title: 'Metier',
            filter:false,
  
            type:'list',
            editor: {
              type: 'list',
              config: {
                list:this.listMetier &&this.listMetier.map((grp)=>{
                return {'value':grp.cod_activite,'title':grp.lib_activite}
                })
                },
            },
    
          },
          profession: {
            title: 'Emploi',
            filter:false,
  
  
          },
    
        },
      };
     this. settings = {
        add:{
          confirmCreate:true,
          addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
          createButtonContent: '<i class="mdi mdi-content-save"></i>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
        edit: {
          confirmSave: true,
          editButtonContent: '<i class="mdi mdi-update"></i> ',
          saveButtonContent: '<a (click)="UpdateEnfant(event)"> <i class="mdi mdi-content-save"></i></a>',
          cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
        },
        delete: {
          confirmDelete: true,
          deleteButtonContent: '<i class="mdi mdi-delete"></i>',
          saveButtonContent: '<i class="mdi mdi-content-save"></i>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
        },
      //     edit:{
      //       confirmEdit:true
      //  },
        columns: {
      
          prenom: {
            title: 'Nom et prénom',
      filter:false
          },
          sexe: {
            title: 'Genre',
            filter:false,
      
            editor: {
              type: 'list',
              config: {
                
                list: [
                  { value: 'F', title: 'Femme' },
                  { value: 'H', title: 'Homme' },
                ],
                },
            },
      
          },
      
          mat_pers: {
            title: 'Matricule',
            filter:false,
      defaultValue:this.matricule,
      hide:true
       
          },
          cod_soc: {
            title: 'code socité',
            filter:false,
            defaultValue:this.cod_soc,
            hide:true
       
          },
      
          dat_naiss: {
            title: 'Date naissance',
            filter:false,
      
      
          },
          
          cod_activite: {
            title: 'Activité',
            filter:false,
      
            editor: {
              type: 'list',
              config: {
                list:this.listActiviteEnfant &&this.listActiviteEnfant.map((grp)=>{
                return {'value':grp.cod_activite,'title':grp.lib_activite}
                })
                },
            },
      
          },
        },
      };

      this.CV = {
        add:{
          confirmCreate:true,
          addButtonContent: '<i class="mdi mdi-folder-plus"></i> ',
          createButtonContent: '<i class="mdi mdi-content-save"></i>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
      },
        edit: {
          confirmSave: true,
          editButtonContent: '<i class="mdi mdi-update"></i> ',
          saveButtonContent: '<a (click)="UpdateConjoint(event)"> <i class="mdi mdi-content-save"></i></a>',
          cancelButtonContent: '<i class="mdi mdi-book-remove-outline"></i>',
        },
        delete: {
          confirmDelete: true,
    deleteButtonContent: '<i class="mdi mdi-delete"></i>',
    saveButtonContent: '<i class="mdi mdi-content-save"></i>',
    cancelButtonContent: '<i class="mdi-book-remove-outline"></i>',
        },
        columns: {
      
      
          cod_niveau: {
            title: 'Dîplome',        filter:false,
      
            type:'list',
            editor: {
              type: 'list',
              config: {
                list:this.listDiplome &&this.listDiplome.map((grp)=>{
                return {'value':grp.cod_niveau,'title':grp.lib_niveau}
                })
                },
            },
          },
          code_domaine: {
            title: 'Spécialité',
            filter:false,
      
            type:'list',
            editor: {
              type: 'list',
              config: {
                list:this.listSpecialite &&this.listSpecialite.map((grp)=>{
                return {'value':grp.code_domaine,'title':grp.lib_domaine}
                })
                },
            },
          },
            cod_etab: {
              title: 'Ecole',
              filter:false,
      
              editor: {
                type: 'list',
                config: {
                  list:this.listOrganisme &&this.listOrganisme.map((grp)=>{
                  return {'value':grp.cod_org,'title':grp.lib_org}
                  })
                  },
              },
            },
      
            date_niveau: {
              title: 'Date dîplome',
              filter:false
              
      
         
            },
      
            mat_pers: {
              title: 'Matricule',
              filter:false,
        defaultValue:this.matricule,
        hide:true
         
            },
            cod_soc: {
              title: 'code socité',
              filter:false,
              defaultValue:this.cod_soc,
              hide:true
         
            },
          },
      
      
        
      };

      this.formPersonnel.patchValue({
        cod_soc:this.personnel.cod_soc,
        mat_pers: this.personnel.mat_pers,
        nom_pers: this.personnel.nom_pers,
        pren_pers:this.personnel.pren_pers,
        nom_pers_a:this.personnel.nom_pers_a,
        pren_pers_a:this.personnel.pren_pers_a,
        nom_jf:this.personnel.nom_jf,
        nom_jf_a: this.personnel.nom_jf_a,
        cin:this.personnel.cin,
        sexe:this.personnel.sexe,
        cod_sit:this.personnel.cod_sit,
        dat_sit:this.personnel.dat_sit,
        chef_fam:this.personnel.chef_fam,
        nbre_enf:this.personnel.nbre_enf,
        charg_enf:this.personnel.charg_enf,
        charg_all: this.personnel.charg_all,
        fct_fam:this.personnel.fct_fam,
        dat_ent:this.personnel.dat_ent,
        dat_tit:this.personnel.dat_tit,
        cod_serv:this.personnel.cod_serv,
        cod_fonct:this.personnel.cod_fonct,
        cod_categ: this.personnel.cod_categ,
        cod_cat: this.personnel.cod_cat,
        cod_grad:this.personnel.cod_grad,
        cod_motif:this.personnel.cod_motif,
        cod_natp:this.personnel.cod_natp,
        cod_stat: this.personnel.cod_stat,
        dat_serv: this.personnel.dat_serv,
        dat_fonct:this.personnel.dat_fonct,
        dat_qualf:this.personnel.dat_qualf,
        dat_categ:this.personnel.dat_categ,
        dat_cat:this.personnel.dat_cat,
        dat_grad: this.personnel.dat_grad,
        dat_ech: this.personnel.dat_ech,
        dat_emb:this.personnel.dat_emb,
        dat_motif:this.personnel.dat_motif,
        dat_nais:this.personnel.dat_nais,
        etat_act: this.personnel.etat_act,
        per_mat_pers:this.personnel.per_mat_pers,
        qualf: this.personnel.qualf,
        cod_ech: this.personnel.cod_ech,
        cod_affect:this.personnel.cod_affect,
        cod_niveau:this.personnel.cod_niveau,
        poste_trav: this.personnel.poste_trav,
        cod_metier:this.personnel.cod_metier,
        cod_user: this.personnel.cod_user,
        dat_maj:this.personnel.dat_maj,
        adm_tech:this.personnel.adm_tech,
        dat_stat: this.personnel.dat_stat,
        dat_cin:this.personnel.dat_cin,
        lie_emi_cin:this.personnel.lie_emi_cin,
        dat_affect: this.personnel.dat_affect,
        lieu_nais:this.personnel.lieu_nais,
        cod_lieu_geog: this.personnel.cod_lieu_geog,
        dat_lieu_geog: this.personnel.dat_lieu_geog,
        grp_sang:this.personnel.grp_sang,
        num_retr:this.personnel.num_retr,
        cod_fil:this.personnel.cod_fil,
        dat_fil:this.personnel.dat_fil,
        code_domaine: this.personnel.code_domaine,
        cod_ur:this.personnel.cod_ur,
        cod_class:this.personnel.cod_class,
        dat_class: this.personnel.dat_class,
        cod_typ_depart:this.personnel.cod_typ_depart,
        dat_depart: this.personnel.dat_depart,
        dat_ur: this.personnel.dat_ur,
        org_serv: this.personnel.org_serv,
        dat_poste_trav:this.personnel.dat_poste_trav,
        cod_nat_recr:this.personnel.cod_nat_recr,
        dat_adm_tech:this.personnel.dat_adm_tech,
        dat_org_serv: this.personnel.dat_org_serv,
        maintien_pers:this.personnel.maintien_pers,
        maintien_date: this.personnel.maintien_date,
        typ_rang: this.personnel.typ_rang,
        handicap: this.personnel.handicap,
        pourcent_hand: this.personnel.pourcent_hand,
        typ_handicap: this.personnel.typ_handicap,
        num_fich_hand:this.personnel.num_fich_hand,
        niv_sal:this.personnel.niv_sal,
        cod_assur: this.personnel.cod_assur,
        num_assur:this.personnel.num_assur,
        cod_retr:this.personnel.cod_retr,
        typ_id: this.personnel.typ_id,
        etat_sante:this.personnel.etat_sante,
        dat_eff_fich_hand:this.personnel.dat_eff_fich_hand,
        dat_fin_fich_hand:this.personnel.dat_fin_fich_hand,
        ref_fonct:this.personnel.ref_fonct,
        nat_texte_fonct:this.personnel.nat_texte_fonct,
        nouv_dat_ech: this.personnel.nouv_dat_ech,
        dat_niv_sal: this.personnel.dat_niv_sal,
        dat_ass: this.personnel.dat_ass,
        dat_aff_cnam: this.personnel.dat_aff_cnam,
        etat_poste_trav: this.personnel.etat_poste_trav,
        dat_fin_cont: this.personnel.dat_fin_cont,
        presum_nais:this.personnel.presum_nais,
        cod_fill: this.personnel.cod_fill,
        suspens_ass: this.personnel.suspens_ass,
        cod_motif_susp: this.personnel.cod_motif_susp,
        dat_fin_suspens:this.personnel.dat_fin_suspens,
        dat_deb_suspens: this.personnel.dat_deb_suspens,
        chronique:this.personnel.chronique,
        cod_cat_class: this.personnel.cod_cat_class,
        cod_gouv: this.personnel.cod_gouv,
        cod_loc:this.personnel.cod_loc,
        serv_mil: this.personnel.serv_mil,
        num_ass_gat: this.personnel.num_ass_gat,
        num_acc: this.personnel.num_acc,
        categ_emb: this.personnel.categ_emb,
        cat_emb: this.personnel.cat_emb,
        grad_emb: this.personnel.grad_emb,
        ech_emb: this.personnel.ech_emb,
        id_personnel:this.personnel.id_personnel,
        lieu_nais_a: this.personnel.lieu_nais_a,
        benef_allf: this.personnel.benef_allf,
        cod_dir: this.personnel.cod_dir,
        cod_uf: this.personnel.cod_uf,
        lib_adm_tech: this.personnel.lib_adm_tech,
        lib_affect:this.personnel.lib_affect,
        lib_cat: this.personnel.lib_cat,
        lib_categ:this.personnel.lib_categ,
        lib_class: this.personnel.lib_class,
        lib_cod_metier: this.personnel.lib_cod_metier,
        lib_domaine: this.personnel.lib_domaine,
        lib_etat_act:this.personnel.lib_etat_act,
        lib_fil: this.personnel.lib_fil,
        lib_fonct: this.personnel.lib_fonct,
        lib_gouv: this.personnel.lib_gouv,
        lib_grad: this.personnel.lib_grad,
        lib_motif:this.personnel.lib_motif,
        lib_niveau:this.personnel.lib_niveau,
        lib_poste_trav:this.personnel.lib_poste_trav,
        lib_serv:this.personnel.lib_serv,
      });
      this.getformatDate();
      this.getformatDateEmbauche();
      this.getformatDateNaissanceEnfant();

    });
    this.persServ
    .GetConjoint(this.formPers.value)
    .subscribe((data: any) => {
      this.conj=data
      this.tableDataConj = this.conj;
      for (let i = 0; i <= this.tableDataConj.length; i++) {
        this.hideme.push(true);
      }


    });
    this.persServ
    .GetEnfant(this.formPers.value)
    .subscribe((data: any) => {
      this.enf=data
      this.tableData = this.enf;
      console.log(this.tableData)
      this.formEnfant.get("mat_pers")
      .patchValue("09650");
      this.formEnfant.get("num_fam")
      .patchValue(1);
  for (let i = 0; i <= this.tableData.length; i++) {
    this.hideme.push(true);


  }


    });
    this.persServ
    .GetCv(this.formPers.value)
    .subscribe((data: any) => {
      this.cv=data
      this.tableDataCV = this.cv;
  for (let i = 0; i <= this.tableDataCV.length; i++) {
    this.hideme.push(true);
  }


    });

}



onRowSelect(event) {
  this.selectedRows = event.selected;
  console.log("fff"+event.data)
} 
onCustom(event: any) {
  console.log(event.data);
}

onEditConfirm(event: any){
  console.log(event.newData);
}


getformatDate() {
  this.persServ.getMaskDate().subscribe((data) => {
    this.maskdate = data;
    Inputmask("datetime", {
      inputFormat: this.maskdate.val1,
      placeholder: "dd/mm/yyyy",
      alias: "datetime",

      max: "01/01/2030",
      clearMaskOnLostFocus: false,
      isComplete: function (buffer, opts) {
        console.log("Data", buffer, opts);
      },
    }).mask(this.myInputElementRefNaissance.nativeElement);
  });
}
onDeleteConfirm(event) {
  console.log("Delete Event In Console")
  console.log(event.data.mat_pers);
  console.log(event);

  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve();
    this.persServ
    .DeleteFamille(event.data.num_fam, event.data.mat_pers)
    .subscribe((dataa) => {});
  } else {
    event.confirm.reject();
  }
}
onDeleteConfirmCv(event) {
  console.log("Delete Event In Console")
  console.log(event.data.mat_pers);
  console.log(event);

  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve();
    this.persServ
    .DeleteCv(event.data.cod_soc, event.data.mat_pers,event.data.num_niveau)
    .subscribe((dataa) => {});
  } else {
    event.confirm.reject();
  }
}

getformatDateEmbauche() {
  this.persServ.getMaskDate().subscribe((data) => {
    this.maskdate = data;
    Inputmask("datetime", {
      inputFormat: this.maskdate.val1,
      placeholder: "dd/mm/yyyy",
      alias: "datetime",

      max: "01/01/2030",
      clearMaskOnLostFocus: false,
      isComplete: function (buffer, opts) {
        console.log("Data", buffer, opts);
      },
    }).mask(this.myInputElementRefEmbauche.nativeElement);
  });
}
getformatDateNaissanceEnfant() {
  this.persServ.getMaskDate().subscribe((data) => {
    this.maskdate = data;
    Inputmask("datetime", {
      inputFormat: this.maskdate.val1,
      placeholder: "dd/mm/yyyy",
      alias: "datetime",

      max: "01/01/2030",
      clearMaskOnLostFocus: false,
      isComplete: function (buffer, opts) {
        console.log("Data", buffer, opts);
      },
    }).mask(this.myInputElementRefNaissanceEnfant.nativeElement);
  });
}

closeRow(event) {
  event.confirm.resolve();
}

AddNewLineConjoint(event:any) {
 console.log(event.newData)
 console.log(event.data)


    this.persServ
      .AddNewLineConjoint(event.newData)
      .subscribe((event: any) => {
        if (event) {
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "L`ajout à été bien enregistrer",
            showConfirmButton: false,
            timer: 2000,
          });
          this.changeTitle();

        }
      });
  }

  AddNewLineEnfant(event:any) {
    console.log(event.newData)
    console.log(event.data)
   
   
       this.persServ
         .AddNewLineEnfant(event.newData)
         .subscribe((event: any) => {
           if (event) {
           } else {
             Swal.fire({
               position: "top-end",
               icon: "success",
               title: "L`ajout à été bien enregistrer",
               showConfirmButton: false,
               timer: 2000,
             });
             this.changeTitle();
   
           }
         });
     }


     AddNewLineCV(event:any) {
      console.log(event.newData)
      console.log(event.data)
     
     
         this.persServ
           .AddNewLineCV(event.newData)
           .subscribe((event: any) => {
             if (event) {
             } else {
               Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "L`ajout à été bien enregistrer",
                 showConfirmButton: false,
                 timer: 2000,
               });
               this.changeTitle();
     
             }
           });
       }

}

import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { GridApi } from "ag-grid-community";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import Swal from "sweetalert2";
import { FamilleService } from "../../Employe/famille.service";
import { AjoutPersService } from "../ajout-pers.service";
import Inputmask from "inputmask";

@Component({
  selector: "app-ajout-agent",
  templateUrl: "./ajout-agent.component.html",
  styleUrls: ["./ajout-agent.component.scss"],
})
export class AjoutAgentComponent implements OnInit {
  @ViewChild("myInput") myInputElementRef: ElementRef;
  @ViewChild("myInput1") myInputElementRef1: ElementRef;
  @ViewChild("myInput2") myInputElementRef2: ElementRef;
  @ViewChild("myInput3") myInputElementRef3: ElementRef;

  userForm: FormGroup;

  maskdate: any;

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
  listNiveau: any;
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
  listActiviteEnfant: any = [];
  listEchlonh: any[];
  listServ: any;
  value: any;
  matricule: any;
  payss: any = [];
  formEnfant: FormGroup;
  form: FormGroup;
  formE: FormGroup;
  FormCVV: FormGroup;
  formlistE: FormArray;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  maxCon: any;

  empForm: FormGroup;

  formTest: FormGroup;

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
    this.getformatDateEmbauche();
   this.getnaisEnfant();
   this.getdatCv()
    this.getformatDate();
    this.addField();
    this.addFieldE();
    this.addFieldCV();
    this.formEnfant = this.fb.group({
      prenom: ["", Validators.required],
      cod_activite: ["", Validators.required],
      dat_naiss: ["", Validators.required],
      sexe: ["", Validators.required],
      profession: ["", Validators.required],

      mat_pers: [""],
      cod_soc: ["01"],
    });

    /**
     * fetch data
     */

    this.formconjoint = this.fb.group({
      prenom: [""],
      cod_pays: [""],
      cod_activite: [""],

      profession: [""],

      mat_pers: [""],
      cod_soc: ["01"],
    });

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
    this.getformatDate();
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
  onSelect(event: any) {
    this.persServ.getgetAllServiceByServ(event.target.value).subscribe(
      (data: any[]) => {
        this.listServ = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * fetches the table value
   */

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */

  //   onSelectCategorie(event:any){
  //     this.value=event.target.value

  //     this.persServ.GetListCategorie(event.target.value).subscribe(
  //       data => {
  //         this.listCateg = data;
  //         console.log(data)

  //       },

  //       );

  //   }

  //   onSelectgrade(event:any){

  // console.log(event.taget.value)
  //       this.persServ.GetListGrad(this.value,event.target.value).subscribe(
  //              data => {
  //              this.listGrad = data;
  //                 },
  //                )

  //   }

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

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSelect2(event: any) {
    console.log(this.value);

    console.log(event.target.value);

    this.persServ.GetListGrad(this.value, event.target.value).subscribe(
      (data: any[]) => {
        this.listGrad = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
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
    this.persServ.getAllDiplome().subscribe((data) => {
      this.listDiplome = data;
    });
  }

  getSpecialite() {
    this.persServ.getAllSpecialite().subscribe((data) => {
      this.listSpecialite = data;
    });
  }

  getOrganisme() {
    this.persServ.getAllOrganisme().subscribe((data) => {
      this.listOrganisme = data;
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
      console.log(this.listService);
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

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSelectMat(event: any) {
    this.value = event.target.value;
    console.log(this.value);

    this.persServ.existByMatPers(event.target.value).subscribe(
      (data: any) => {
        this.etatmat = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  AjoutPersonnel() {
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
            this.changeTitle();
            this.matricule = this.formPersonnel.get("mat_pers").value;
            console.log(this.matricule);
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

  AjoutFamille() {
    for (let index = 0; index < this.formData().controls.length; index++) {
      this.formData().controls[index].get("mat_pers").patchValue(this.value);
    }
    this.persServ
      .AjoutConjoint(this.form.get("formlist").value)
      .subscribe((event: any) => {
        console.log("eeeeeeee");
      });
  }

  AjoutEnfant() {
    for (
      let index = 0;
      index < this.formDataEnfant().controls.length;
      index++
    ) {
      this.formDataEnfant()
        .controls[index].get("mat_pers")
        .patchValue(this.value);
    }

    this.persServ
      .AjoutEnfant(this.formE.get("formlistE").value)
      .subscribe((event: any) => {
        if (event) {
          console.log("eeeeeeee");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "L`ajout à été bien enregistrer",
            showConfirmButton: false,
            timer: 2000,
          });
          console.log("eeeeeeee");
        }
      });
    console.log(this.formEnfant.get("mat_pers").value);
  }

  AjoutCv() {
    for (let index = 0; index < this.formDataCV().controls.length; index++) {
      this.formDataCV().controls[index].get("mat_pers").patchValue(this.value);
    }

    this.persServ.AjoutCV(this.FormCVV.get("formlistCV").value).subscribe((data: any) => {
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

  get mat_pers(): any {
    return this.formPersonnel.get("mat_pers");
  }
  getformatDate() {
    this.persServ.getMaskDate().subscribe((data) => {
      this.maskdate = data;
      Inputmask("datetime", {
        inputFormat: this.maskdate.val1,
        placeholder: "dd/mm/yyyy",
        alias: "datetime",

        max: "01/01/2010",
        clearMaskOnLostFocus: false,
        isComplete: function (buffer, opts) {
          console.log("Data", buffer, opts);
        },
      }).mask(this.myInputElementRef.nativeElement);
    });
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
      }).mask(this.myInputElementRef1.nativeElement);
    });
  }
  getnaisEnfant() {
    this.persServ.getMaskDate().subscribe((data) => {
      this.maskdate = data;
      Inputmask("datetime", {
        inputFormat: this.maskdate.val1,
        placeholder: "dd/mm/yyyy",
        alias: "datetime",

       
        clearMaskOnLostFocus: false,
        isComplete: function (buffer, opts) {
          console.log("Data", buffer, opts);
        },
      }).mask(this.myInputElementRef2.nativeElement);
    });
  }
  getdatCv() {
    this.persServ.getMaskDate().subscribe((data) => {
      this.maskdate = data;
      Inputmask("datetime", {
        inputFormat: this.maskdate.val1,
        placeholder: "dd/mm/yyyy",
        alias: "datetime",

       
        clearMaskOnLostFocus: false,
        isComplete: function (buffer, opts) {
          console.log("Data", buffer, opts);
        },
      }).mask(this.myInputElementRef3.nativeElement);
    });
  }
  DeleteFamille() {
    this.persServ.GetMaxConjoint("01", this.value).subscribe((data) => {
      this.maxCon = data;
    });
    this.persServ
      .DeleteFamille(this.maxCon, this.value)
      .subscribe((dataa) => {});
  }
  returnShow() {
    this.show = true;
    this.ngOnInit();
  }
}

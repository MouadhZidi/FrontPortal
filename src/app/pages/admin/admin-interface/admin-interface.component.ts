import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AdminInterfaceService } from '../admin-interface.service';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})
export class AdminInterfaceComponent implements OnInit {
list:any[]
userForm: FormGroup;
lib:any
p:any
term:string
  constructor(private adminServ:AdminInterfaceService,private formBuilder:FormBuilder,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      use_id:[''],
      role_portail: [''],
      use_pswd: [''],


    });
    this. getUtilisateur()
  }
  updateDemande(){

    this.adminServ.UpdateRole(this.userForm.value)

     .subscribe({
       next:(res)=>{
         if (res) {
           if (res) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Le rôle est ajouter avec succées !',
              showConfirmButton: false,
              timer: 2000
            });
            // this.toastr.success(' agence updated!', 'update effectuée avec succés.');
         //  this.userForm.reset();
         this.getUtilisateur()
           this.modalService.dismissAll();
           } else {
            // this.toastr.error('Echec update', 'Problème de suppression.');
           }

                 }

       },



     })

 }

 updatePass(){

  this.adminServ.UpdatePss(this.userForm.value)

   .subscribe({
     next:(res)=>{
       if (res) {
         if (res) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Le rôle est ajouter avec succées !',
            showConfirmButton: false,
            timer: 2000
          });
          // this.toastr.success(' agence updated!', 'update effectuée avec succés.');
       //  this.userForm.reset();
       this.getUtilisateur()
         this.modalService.dismissAll();
         } else {
          // this.toastr.error('Echec update', 'Problème de suppression.');
         }

               }

     },



   })

}
  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });

    this.userForm.patchValue({
      use_id: user.use_id,

      role_portail: user.role_portail,


    });
    this.lib=this.userForm.get('use_id').value
    console.log(this.lib)



   }
   openModalupdatePass(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });

    this.userForm.patchValue({
      use_id: user.use_id,

      use_pswd: user.use_pswd,


    });
    this.lib=this.userForm.get('use_id').value
    console.log(this.lib)



   }

  getUtilisateur() {
    this.adminServ.GetUser().subscribe(
      (data: any[]) => {
        this.list = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

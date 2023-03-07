import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { WebsocketService } from "src/app/layouts/topbar/shared/services/websocket.service";
import Swal from "sweetalert2";
import { NoteEventService } from "../note-event.service";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.scss"],
})
export class AddEventComponent implements OnInit {
  file!: File; // Variable to store file
  image!: File;
  eventForm: FormGroup;
  notificationForm: FormGroup;

  constructor(private websocketService: WebsocketService,private fb: FormBuilder, private ser: NoteEventService,private token:TokenStorage) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
     // id_evenement: ["", Validators.required],

      date_even: ["", Validators.required],
      date_expiration: ["", Validators.required],
      typ_even: ["", Validators.required],
      typ_droit: ["", Validators.required],
      libelle: ["", Validators.required],
     
    });
  }
  Notification: any = {
    date_notif: "",
    libelle_notif: "",
    nom: "",
    type_notif: "",
    cod_soc:"",
	 mat_pers:"",
id_sender:"",
id_reciver:"",
etat_notif:""
  };

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onImageSelected(event: any) {
    this.image = event.target.files[0];
  }
  DemandeEvent() {
    const formData = new FormData();
    const event = this.eventForm.value;

    formData.append("file", this.file);
    formData.append("image", this.image);
    formData.append("event", JSON.stringify(event));


    this.Notification.date_notif=new Date().toLocaleDateString().substring(0,10)
 this.Notification.libelle_notif="Evenement"
 this.Notification.nom=this.eventForm.get('libelle').value 
 this.Notification.type_notif="Evenement"
 this.Notification.mat_pers=this.token.getUser().matpers
 this.Notification.id_sender=this.token.getUser().matpers
 this.Notification.etat_notif="N"
 this.Notification.cod_soc=this.token.getUser().cod_soc



    this.ser.upload(formData).subscribe((event: any) => {
      if (event) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Votre ajout à été bien enregistrer",
          showConfirmButton: false,
          timer: 2000,
        });
        this.websocketService.AjouNotif(this.Notification).subscribe(
          (event: any) => {
          }
      );
      } else {
        //  this.toastr.error('Echec ajout', 'Problème de suppression.');
      }
    });
  }
}

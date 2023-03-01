import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  
  constructor(private fb: FormBuilder, private ser: NoteEventService) {}

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

    this.ser.upload(formData).subscribe((event: any) => {
      if (event) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Votre ajout à été bien enregistrer",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        //  this.toastr.error('Echec ajout', 'Problème de suppression.');
      }
    });
  }
}

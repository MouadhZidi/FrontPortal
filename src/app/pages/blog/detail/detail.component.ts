import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NoteEventService } from "../note-event.service";
import { saveAs } from "file-saver";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  id: any;
  event: any;
  imageUrl: any;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(private ac: ActivatedRoute, private serv: NoteEventService,private sanitizer: DomSanitizer) {
    this.id = this.ac.snapshot.params["id"];
    
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      { label: "Evenement", active: false },
    ];
    this.getbyid();
    this.getImageById();
    console.log("iddididi"+this.id +" " + typeof(this.id));
    
  }
  getbyid() {
    this.serv.getbyid(this.id).subscribe(
      (data) => {
        this.event = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getImageById() {
    this.serv.getImageById(this.id).subscribe(
      
      (data) => {
        let objectURL = URL.createObjectURL(data);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createHyperLink(params: any): any {
    console.log(params.data.id_evenement);

    if (!params.data) {
      return;
    }
    const spanElement = document.createElement("span");
    spanElement.innerHTML = `<a href="${this.homeUrl}" > ${params.value} </a> `;
    spanElement.addEventListener("click", ($event) => {
      $event.preventDefault();
      // The below code is used to navigate from one page to another page in angular. you can change it          // according to your requirement.
      this.serv
        .download(params.data.id_evenement)
        .subscribe((blob) => saveAs(blob, params.value));
    });
    return spanElement;
  }

  get homeUrl(): string {
    return "home";
  }
  printerReportt() {
    try {
      this.serv
        .download(this.event.id_evenement)
        .subscribe((blob) => saveAs(blob, this.event.libelle));
    } catch (error) {
      console.log(error);
    }
  }
}

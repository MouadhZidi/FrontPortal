import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NoteEventService } from "../../note-event.service";
import { Event_Entite } from "./event_entity";

@Component({
  selector: "app-evenement",
  templateUrl: "./evenement.component.html",
  styleUrls: ["./evenement.component.scss"],
})
export class EvenementComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  list: any = [];
  term: string;
  p: any;
  id: any;
  imageUrl: any;
  listImage:any=[]
  imageUrll: any;
  products :any;
  imageObject!:any
  compund_array_object:any= [];
  public events : Event_Entite[]

  constructor(
    private serv: NoteEventService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.clear()
    this.breadCrumbItems = [
      { label: "Blog" },
      { label: "Blog Grid", active: true },
    ];
   // this.getbyid();
    // this.getImageById();
  //   this.getImages()


  
    this.serv.getbyD().subscribe((events:Event_Entite[]) => {
      
        this.events = events

        for (let item of  this.events) {
            item.imageUrl= item.image_EVEN ? 'data:image/jpeg;base64,' + item.image_EVEN :
            "../../../assets/images/verification-img.png";

        }
        console.log("element come from api",this.events)
    }, (error: ErrorEvent) => {
    })

  console.log("listedtlist *****",this.list);
  //this.getImageById()
  } 
  // getbyid() {
      
  //   this.serv.getbyD().subscribe(
  //     (data) => {
  //       this.list = data;
  //       let objectURL = URL.createObjectURL(this.list);
  //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
     
  
  //         },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
   
    
  // }
  // getImageById() {
  //   this.serv.getImageById(168).subscribe(
      
  //     (data) => {
  //       let objectURL = URL.createObjectURL(data);
  //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // getImages() {
  //   this.serv.getImages().subscribe(
  //     (data) => {
  //       this.listImage = data;
  //       console.log("het jeyyyyy"+this.listImage)
  //       for(let i=0;i<4;i++){
  //         let objectURL = URL.createObjectURL( this.listImage[i]);
  //         this.imageUrll = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //       }

  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // getImageById() {
  //   this.serv.getImageById(this.id).subscribe(
  //     (data) => {
  //       let objectURL = URL.createObjectURL(data);
  //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getFormattedDate(date: string) {
    // check if the date is in the format dd/mm/yyyy
    const ddMmYyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (ddMmYyyyRegex.test(date)) {
      // the date is in the correct format, so you can return it as is
      if (date.includes("/")) {
        const dateParts = date.split("/");

        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
          return `${day}/${month}/${year}`;
        }
      }
    }

    // check if the date is in the format dd-mm-yyyy
    const ddDashMmYyyyRegex = /^\d{2}-\d{2}-\d{4}$/;

    if (ddDashMmYyyyRegex.test(date)) {
      // the date is in the correct format, so you can return it as is
      if (date.includes("-")) {
        const dateParts = date.split("-");

        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
          return `${day}/${month}/${year}`;
        }
      }
    }

    // check if the date is in the format dd-mm-yyyy
    const dDashMmYyyyRegex = /^\d{2}-\d{2}-\d{4}$/;

    if (dDashMmYyyyRegex.test(date)) {
      // the date is in the correct format, so you can return it as is
      if (date.includes("-")) {
        const dateParts = date.split("-");

        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
          return `${day}/${month}/${year}`;
        }
      }
    }

    // check if the date is in the format mm/dd/yyyy
    const mmDdYyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (mmDdYyyyRegex.test(date)) {
      // the date is in the correct format, so you can return it as is
      if (!date.includes("/")) {
        const dateParts = date.split("/");

        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];

        if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
          return `${day}/${month}/${year}`;
        }
      }
    }

    // if the date is in none of the above formats, return an empty string

    if (date.length == 8) {
      if (
        Number(date.substring(2, 4)) > 12 ||
        Number(date.substring(2, 4)) <= 31
      ) {
        const day = date.substring(0, 2);

        const month = date.substring(2, 4);
        const year = date.substring(4);
      }

      const day = date.substring(0, 2);
      const month = date.substring(2, 4);
      const year = date.substring(4);
      if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
        document.getElementById("date1").style.borderColor = "";

        return `${day}/${month}/${year}`;
      }
    }

    // check if the date is in the format yyyy/mm/dd
    const yyyyMmDdRegex = /^\d{4}\/\d{2}\/\d{2}$/;

    if (yyyyMmDdRegex.test(date)) {
      // the date is in the format yyyy/mm/dd
      const dateParts = date.split("/");
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
        return `${day}/${month}/${year}`;
      }
    }

    // check if the date is in the format yyyy/dd/mm
    const yyyyDdMmRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (yyyyDdMmRegex.test(date)) {
      // the date is in the format yyyy/dd/mm
      const dateParts = date.split("/");
      const year = dateParts[0];
      const day = dateParts[1];
      const month = dateParts[2];

      if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
        return `${day}/${month}/${year}`;
      }
    }

    // check if the date is in the format yyyy-mm-dd
    const yyyyMmDdRegexM = /^\d{4}-\d{2}-\d{2}$/;

    if (yyyyMmDdRegexM.test(date)) {
      // the date is in the format yyyy-mm-dd
      const dateParts = date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
        return `${day}/${month}/${year}`;
      }
    }
    // check if the date is in the format yyyy-dd-mm
    const yyyyDdMmRegexD = /^\d{4}-\d{2}-\d{2}$/;

    if (yyyyDdMmRegexD.test(date)) {
      // the date is in the format yyyy/dd/mm
      const dateParts = date.split("-");
      const year = dateParts[0];
      const day = dateParts[1];
      const month = dateParts[2];

      if (Number(month) <= 12 && Number(day) <= 31 && year.length == 4) {
        return `${day}/${month}/${year}`;
      }
    }
  }
}

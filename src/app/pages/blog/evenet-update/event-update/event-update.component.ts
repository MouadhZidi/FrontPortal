import { Component, OnInit } from "@angular/core";
import { Event_Entite } from "src/app/shared/ui/evenement/evenement/event_entity";
import { NoteEventService } from "../../note-event.service";

@Component({
  selector: "app-event-update",
  templateUrl: "./event-update.component.html",
  styleUrls: ["./event-update.component.scss"],
})
export class EventUpdateComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  list: any = [];
  term: string;
  p: any;
  public events : Event_Entite[]

  constructor(private serv: NoteEventService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Espace d`évenement" },
      { label: "Liste des évenements", active: true },
    ];

    this.serv.getbyD().subscribe((events:Event_Entite[]) => {
      
      this.events = events

      for (let item of  this.events) {
          item.imageUrl= item.image_EVEN ? 'data:image/jpeg;base64,' + item.image_EVEN :
          "../../../assets/images/verification-img.png";

      }
      console.log("element come from api",this.events)
  }, (error: ErrorEvent) => {
  })
  
    
  }
  
   
}

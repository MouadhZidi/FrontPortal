import { Component, OnInit } from '@angular/core';
import { Event_Entite } from 'src/app/shared/ui/evenement/evenement/event_entity';
import { NoteEventService } from '../note-event.service';

@Component({
  selector: 'app-bloggrid',
  templateUrl: './bloggrid.component.html',
  styleUrls: ['./bloggrid.component.scss']
})
export class BloggridComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;
 list:any=[]
 term:string
 p:any
 public events : Event_Entite[]

  constructor(private serv:NoteEventService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Espace d`évenement' }, { label: 'Historique d`évenement', active: true }];
    



    this.serv.getall().subscribe((events:Event_Entite[])  =>  {
     
  
      this.events = events

      for (let item of  this.events) {
          item.imageUrl= item.image_EVEN ? 'data:image/jpeg;base64,' + item.image_EVEN :
          "../../../assets/images/verification-img.png";

      }
      
      
      
      },
      err => {
        console.log(err);
      }
      );
  
  
  
  
  
  
    }
  
  

}

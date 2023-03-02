import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { WebsocketService } from "src/app/layouts/topbar/shared/services/websocket.service";
import { PersonnelService } from "../../Employe/personnel.service";
import { Project } from "../../projects/project.model";
import { projectData } from "../../projects/projectdata";
import { HistoriqueNotificationService } from "../historique-notifications.service";

@Component({
  selector: "app-list-notifications",
  templateUrl: "./list-notifications.component.html",
  styleUrls: ["./list-notifications.component.scss"],
})
export class ListNotificationsComponent implements OnInit {
  projectData: Project[];
  breadCrumbItems: Array<{}>;
  ListHistorique: any[] = [];
  notifForm: FormGroup;
 

  constructor(
    private fb: FormBuilder,
    public token: TokenStorage,
    private serv: HistoriqueNotificationService
  ) {}

  ngOnInit(): void {
    this.getNotification()

    this.breadCrumbItems = [
      { label: "Notifications" },
      { label: "Liste des notifications", active: true },
    ];



    this.notifForm = this.fb.group({
      id_notif: [""],
      etat_notif: [""],
      type_notif: [""],
    });

  }

  
 

  getNotification(){

    this.serv.GetHistorique(this.token.getUser().matpers,this.token.getUser().cod_soc).subscribe(
      data => {
        this.ListHistorique=data
        console.log("historiquenotif"+this.ListHistorique);
        console.log("matricule"+this.token.getUser().matpers)
        console.log("code societe"+this.token.getUser().cod_soc)
       
  
      },
      err => {
        console.log(err);
      }
      );
  } 

}



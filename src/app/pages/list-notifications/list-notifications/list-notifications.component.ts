import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { WebsocketService } from "src/app/layouts/topbar/shared/services/websocket.service";
import { EspaceRhService } from "../../EspaceRh/espace-rh.service";
import { Project } from "../../projects/project.model";
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
  ListNotificationEvent: any[] = [];
  notifForm: FormGroup;
  notif: any[] = [];
  term: string;
  page: any;
  AllNotif: any = [];
  constructor(
    private servv: WebsocketService,
    private fb: FormBuilder,
    public token: TokenStorage,
    private serv: HistoriqueNotificationService
  ) {}

  ngOnInit(): void {
    this.getNotification();
    this.getNotificationEvent();
    this.getAllNotif();

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

  getNotification() {
    this.serv
      .GetHistorique(this.token.getUser().matpers, this.token.getUser().cod_soc)
      .subscribe(
        (data) => {
          this.ListHistorique = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAllNotif() {
    this.serv
      .GetHistorique(this.token.getUser().matpers, this.token.getUser().cod_soc)
      .subscribe(
        (data) => {
          this.ListHistorique = data;

          for (let i = 0; i < this.ListHistorique.length; i++) {
            const element = this.ListHistorique[i];
            this.AllNotif.push(element);
          }
        },
        (err) => {
          console.log(err);
        }
      );

    this.serv.getNotificationEvent().subscribe(
      (data) => {
        this.ListNotificationEvent = data;

        for (let j = 0; j < this.ListNotificationEvent.length; j++) {
          const element = this.ListNotificationEvent[j];
          this.AllNotif.push(element);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getNotificationEvent() {
    this.serv.getNotificationEvent().subscribe(
      (data) => {
        this.ListNotificationEvent = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  action(notif: any) {
    this.ListHistorique = notif;

    this.servv.UpdateEtatNotif(notif).subscribe((data: any[]) => {
      this.getNotification();
    });
  }
  

  FilterRouterLink(role_portail:string,libelle_notif:string,type_notif?:string):string{

    if(libelle_notif==='Evenement'){
        return '/blog/getbyD';
    }

    if(role_portail==='CHEF'){
        return "/EspaceChef/Chef"
    }

    if(role_portail==='RH'){
      return "/EspaceRh/Rh"
    }

    if (role_portail=="UTILISATEUR") {
        switch (type_notif) {
          case 'Prets et avances':
            return "/demande/PretAvance"
          
          case 'Congés':
            return "/demande/Conge"

          case 'Formation':
            return "/demande/Formation"

          case 'Autorisations':
            return "/demande/Autorisation"

          case 'Situation Administrtive':
            return "/demande/Situation"

          case 'Document':
            return "/demande/Document"
        
          default:
            break;
        }
    }
 



      return ""
  }


}

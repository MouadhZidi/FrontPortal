import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { WebsocketService } from "src/app/layouts/topbar/shared/services/websocket.service";
import { PersonnelService } from "../../Employe/personnel.service";
import { Project } from "../../projects/project.model";
import { projectData } from "../../projects/projectdata";

@Component({
  selector: "app-list-notifications",
  templateUrl: "./list-notifications.component.html",
  styleUrls: ["./list-notifications.component.scss"],
})
export class ListNotificationsComponent implements OnInit {
  projectData: Project[];
  breadCrumbItems: Array<{}>;
  list22: any[] = [];
  notifForm: FormGroup;
  n: any;
  lib: any;
  listAllNotif: any;
  pers: any = {
    cod_soc: this.token.getUser().cod_soc,
    mat_pers: this.token.getUser().matpers,
  };

  constructor(
    private fb: FormBuilder,
    private websocketService: WebsocketService,
    public token: TokenStorage,
    private serv: PersonnelService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Notifications" },
      { label: "Liste des notifications", active: true },
    ];

    this.projectData = projectData;
    this.getAllnotification();
    this.getNotification();
    this.notifForm = this.fb.group({
      id_notif: [""],
      etat_notif: [""],
      type_notif: [""],
    });
  }

  openModal(user) {
    this.notifForm.patchValue({
      id_notif: user.id_notif,

      etat_notif: user.etat_notif,
      type_notif: user.type_notif,
    });
    this.lib = this.notifForm.get("type_notif").value;
    console.log(this.lib);

    this.websocketService
      .UpdateEtatNotif(this.notifForm.value)

      .subscribe({
        next: (res) => {
          if (res) {
            if (res) {
              this.getAllnotification();
              // this.toastr.success(' agence updated!', 'update effectuée avec succés.');
              //  this.userForm.reset();
            } else {
              // this.toastr.error('Echec update', 'Problème de suppression.');
            }
          }
        },
      });
  }

  getNotification() {
    if (this.token.getUser().role_portail == "RH") {
      this.websocketService.GetNotifRh().subscribe(
        (data) => {
          this.list22 = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.serv.getpersonnel(this.pers).subscribe(
        (data) => {
          this.n = this.pers.cod_serv;
          this.websocketService
            .GetNotifByMat(this.token.getUser().matpers)
            .subscribe(
              (data) => {
                this.list22 = data;
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (err) => {
          console.log(err);
        }
      );
    }
    console.log("serv" + this.n);
  }

  getAllnotification() {
    this.websocketService.GetAllNotif().subscribe((data) => {
      this.listAllNotif = data;
      console.log(this.listAllNotif);
    });
  }
}

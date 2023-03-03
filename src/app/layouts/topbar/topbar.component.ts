import { Component, OnInit, Output, EventEmitter, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { AuthenticationService } from "../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../core/services/authfake.service";
import { environment } from "../../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { LanguageService } from "../../core/services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { PersonnelService } from "src/app/pages/Employe/personnel.service";
import { NotificationService } from "./shared/services/notification.service";
import { WebsocketService } from "./shared/services/websocket.service";
import { PushNotificationsService } from "ng-push-ivy";
import { AppNotification } from "./shared/model/app-notification";
import { FormBuilder, FormGroup } from "@angular/forms";

const icon = new Map([
  ["info", "assets/bell-info.png"],
  ["warn", "assets/bell-warning.png"],
]);
@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  list: any = [];
  list22: any[] = [];
  title = "Web push Notifications!";
  counter: number;
  nbr: any;
  listAllNotif: any;
  n: any;
  notif: any;
  index: any;
  pers: any = {
    cod_soc: this.token.getUser().cod_soc,
    mat_pers: this.token.getUser().matpers,
  };
  notifForm: FormGroup;
  lib: any;
  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  role = this.token.getUser().role_portail;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public _cookiesService: CookieService,
    public token: TokenStorage,
    private serv: PersonnelService,
    private pushNotifications: PushNotificationsService,
    private notificationService: NotificationService,
    private websocketService: WebsocketService,
    private fb: FormBuilder
  ) {
    this.pushNotifications.requestPermission();
    this.counter = 0;
  }

  listLang = [
    { text: "Français", flag: "assets/images/flags/french.jpg", lang: "es" },
    { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.getpers();
    this.getnbrnotif();
    this.getNotification();
    this.getAllnotification();
    this.openMobileMenu = false;
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get("lang");
    const val = this.listLang.filter((x) => x.lang === this.cookieValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = "assets/images/flags/french.jpg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
    this.connect();

    this.notifForm = this.fb.group({
      id_notif: [""],
      etat_notif: [""],
      type_notif: [""],
    });
  }
  connect(): void {
    this.websocketService.connect();

    // subscribe receives the value.
    this.notificationService.notificationMessage.subscribe((data) => {
      console.log("receive message", data);

      this.notify(data);
    });
  }
  getAllnotification() {
    this.websocketService.GetAllNotif().subscribe((data) => {
      this.listAllNotif = data;
      console.log(this.listAllNotif);
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

  notify(message: AppNotification): void {
    this.counter++;
    this.getnbrnotif();
    this.getNotification();
    const options = {
      body: message.libelle_notif,
      icon: icon.get(message.type_notif.toLowerCase()),
    };
    console.log(message.libelle_notif);
    this.list.push(message);
    console.log(this.list);

    this.pushNotifications.create("New Alert", options).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
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
  updateDemande() {
    this.websocketService
      .UpdateEtatNotif(this.notifForm.value)

      .subscribe({
        next: (res) => {
          if (res) {
            if (res) {
              // this.toastr.success(' agence updated!', 'update effectuée avec succés.');
              //  this.userForm.reset();
            } else {
              // this.toastr.error('Echec update', 'Problème de suppression.');
            }
          }
        },
      });
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }
  getpers() {
    this.serv.getpersonnel(this.pers).subscribe(
      (data) => {
        this.pers = data;
        console.log("exected" + data);
        this.n = this.pers.cod_serv;
      },
      (err) => {
        console.log(err);
      }
    );
    this.websocketService
      .getnbrnotif(this.token.getUser().matpers, this.token.getUser().cod_soc)
      .subscribe(
        (data) => {
          this.nbr = data;
          console.log("exected" + data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  /**
   * Logout the user
   */
  logout() {
    this.token.signOut();
    this.router.navigate(["/account/login"]);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle("fullscreen-enable");
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
  getnbrnotif() {
    this.websocketService
      .getnbrnotif(this.token.getUser().matpers, this.token.getUser().cod_soc)
      .subscribe(
        (data) => {
          this.nbr = data;
          console.log("exected" + data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  FilterRouterLink(
    role_portail: string,
    libelle_notif: string,
    type_notif?: string
  ): string {
    if (libelle_notif === "Evenement") {
      return "/blog/getbyD";
    }

    if (role_portail === "CHEF") {
      return "/EspaceChef/Chef";
    }

    if (role_portail === "RH") {
      return "/EspaceRh/Rh";
    }

    if (role_portail == "UTILISATEUR") {
      switch (type_notif) {
        case "Prets et avances":
          return "/demande/PretAvance";

        case "Congés":
          return "/demande/Conge";

        case "Formation":
          return "/demande/Formation";

        case "Autorisations":
          return "/demande/Autorisation";

        case "Situation Administrtive":
          return "/demande/Situation";

        case "Document":
          return "/demande/Document";

        default:
          break;
      }
    }

    return "";
  }
}

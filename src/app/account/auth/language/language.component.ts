import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PersonnelService } from 'src/app/pages/Employe/personnel.service';

import { PushNotificationsService } from 'ng-push-ivy';

import { FormBuilder, FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/core/services/language.service';


const icon = new Map([
  ['info', 'assets/bell-info.png'],
  ['warn', 'assets/bell-warning.png']
]);

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {


  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  constructor(private router: Router, 
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService,
        
            ) {

  }

  listLang = [
    { text: 'Français', flag: 'assets/images/flags/french.jpg', lang: 'es' },
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
   

  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
 
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/french.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }



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

  /**
   * Logout the user
   */


  /**
   * Fullscreen method
   */


  
}

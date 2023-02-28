import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-competancesreel',
  templateUrl: './competancesreel.component.html',
  styleUrls: ['./competancesreel.component.scss']
})
export class CompetancesreelComponent implements OnInit {

  mat_pers=this.tokenService.getUser().matpers

  constructor(private tokenService:TokenStorage) { }

  ngOnInit(): void {
  }

}

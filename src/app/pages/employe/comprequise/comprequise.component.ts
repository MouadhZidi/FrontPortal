import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-comprequise',
  templateUrl: './comprequise.component.html',
  styleUrls: ['./comprequise.component.scss']
})
export class ComprequiseComponent implements OnInit {

  mat_pers=this.tokenService.getUser().matpers
  constructor(private tokenService:TokenStorage) { }

  ngOnInit(): void {
  }

}

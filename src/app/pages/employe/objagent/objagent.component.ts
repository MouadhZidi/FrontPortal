import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-objagent',
  templateUrl: './objagent.component.html',
  styleUrls: ['./objagent.component.scss']
})
export class ObjagentComponent implements OnInit {

  mat_pers:any=this.token.getUser().matpers
  constructor(private token:TokenStorage) { }

  ngOnInit(): void {
    
  }

}

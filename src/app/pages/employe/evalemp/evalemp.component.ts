import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-evalemp',
  templateUrl: './evalemp.component.html',
  styleUrls: ['./evalemp.component.scss']
})
export class EvalempComponent implements OnInit {


  mat_pers:any=this.token.getUser().matpers
  constructor(private token:TokenStorage) { }
  ngOnInit(): void {
    
  }


}

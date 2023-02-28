import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loo',
  templateUrl: './loo.component.html',
  styleUrls: ['./loo.component.scss']
})
export class LooComponent implements OnInit {
  loading: boolean = true;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      setTimeout(() => {
        this.loading = v;
      }, 6000);     
    });
  }



  ngOnInit(): void {
  }

}

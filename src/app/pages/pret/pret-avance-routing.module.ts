import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { PretAvanceComponent } from './pret-avance/pret-avance.component';





const routes: Routes = [
    {
        path: 'pret-avance',
        component: PretAvanceComponent,canActivate:[GuardauthService]
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PretAvanceRoutingModule {}

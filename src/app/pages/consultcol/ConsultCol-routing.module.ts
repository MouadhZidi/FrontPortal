import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { EvalcompComponent } from '../Employe/evalcomp/evalcomp.component';
import { InfopersComponent } from './infopers/infopers.component';
import { InfoprofComponent } from './infoprof/infoprof.component';
import { InfosocComponent } from './infosoc/infosoc.component';




const routes: Routes = [
    {
        path: 'infopers',
        component: InfopersComponent,canActivate:[GuardauthService]
    },
    {
        path: 'infoprof',
        component: InfoprofComponent,canActivate:[GuardauthService]
    },
    {
        path: 'infosoc',
        component: InfosocComponent,canActivate:[GuardauthService]
    },
    {
        path: 'evalcomp',
        component: EvalcompComponent,canActivate:[GuardauthService]
    }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultColRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { CompetenceComponent } from './competence/competence.component';





const routes: Routes = [
    {
        path: 'competence',
        component: CompetenceComponent
    },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetenceRoutingModule {}
